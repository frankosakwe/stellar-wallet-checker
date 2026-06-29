@echo off
REM Deploy script for Soroban smart contract (Windows)
REM Deploys the contract to Stellar Testnet

echo.
echo 🚀 Deploying Soroban Counter Contract to Testnet...
echo.

REM Check if we're in the contracts directory
if not exist "Cargo.toml" (
    echo ❌ Error: Cargo.toml not found
    echo Please run this script from the contracts\ directory
    exit /b 1
)

REM Check if soroban CLI is installed
where soroban >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: Soroban CLI not found
    echo Please install it: cargo install --locked soroban-cli
    exit /b 1
)

REM Check if WASM binary exists
set WASM_FILE=target\wasm32-unknown-unknown\release\counter_contract.wasm
set OPTIMIZED_FILE=target\wasm32-unknown-unknown\release\counter_contract.optimized.wasm

if exist "%OPTIMIZED_FILE%" (
    set DEPLOY_FILE=%OPTIMIZED_FILE%
    echo 📦 Using optimized WASM binary
) else if exist "%WASM_FILE%" (
    set DEPLOY_FILE=%WASM_FILE%
    echo 📦 Using standard WASM binary ^(consider optimizing first^)
) else (
    echo ❌ Error: WASM binary not found
    echo Please build the contract first: scripts\build.bat
    exit /b 1
)

echo.

REM Check if testnet network is configured
soroban network ls | findstr /C:"testnet" >nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚙️  Configuring testnet network...
    soroban network add testnet --rpc-url https://soroban-testnet.stellar.org:443 --network-passphrase "Test SDF Network ; September 2015"
    echo ✅ Testnet network configured
)

REM Check if identity exists
set IDENTITY=deployer
soroban keys ls | findstr /C:"%IDENTITY%" >nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo 🔑 No deployer identity found. Creating one...
    echo ⚠️  Please save the generated secret key securely!
    echo.
    soroban keys generate %IDENTITY% --network testnet
    
    echo.
    echo ✅ Identity created
    for /f "tokens=*" %%i in ('soroban keys address %IDENTITY%') do set PUBLIC_KEY=%%i
    echo 📋 Public Key: %PUBLIC_KEY%
    echo.
    echo 💰 Funding account with testnet XLM...
    soroban keys fund %IDENTITY% --network testnet
    
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Account funded
    ) else (
        echo ⚠️  Auto-funding failed. Please fund manually:
        echo    Visit: https://laboratory.stellar.org/#account-creator?network=test
        echo    Public Key: %PUBLIC_KEY%
        pause
    )
)

echo.
echo 🚀 Deploying contract to Stellar Testnet...
echo.

REM Deploy the contract
for /f "tokens=*" %%i in ('soroban contract deploy --wasm %DEPLOY_FILE% --source %IDENTITY% --network testnet') do set CONTRACT_ID=%%i

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Contract deployed successfully!
    echo.
    echo 📜 Contract ID:
    echo    %CONTRACT_ID%
    echo.
    echo 🔍 View on Stellar Expert:
    echo    https://stellar.expert/explorer/testnet/contract/%CONTRACT_ID%
    echo.
    echo 📝 Update your frontend configuration:
    echo    File: src\contractConfig.js
    echo    Replace CONTRACT_ADDRESS with: %CONTRACT_ID%
    echo.
    echo 🎯 Test the deployment:
    echo    soroban contract invoke \
    echo      --id %CONTRACT_ID% \
    echo      --source %IDENTITY% \
    echo      --network testnet \
    echo      -- increment
    echo.
    
    REM Save contract ID to file
    echo %CONTRACT_ID% > .contract-id
    echo 💾 Contract ID saved to .contract-id
) else (
    echo.
    echo ❌ Deployment failed!
    exit /b 1
)
