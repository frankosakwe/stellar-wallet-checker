@echo off
REM Build script for Soroban smart contract (Windows)
REM This script builds the contract WASM binary

echo.
echo 🔨 Building Soroban Counter Contract...
echo.

REM Check if we're in the contracts directory
if not exist "Cargo.toml" (
    echo ❌ Error: Cargo.toml not found
    echo Please run this script from the contracts\ directory
    exit /b 1
)

REM Check if Rust is installed
where cargo >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: Cargo not found
    echo Please install Rust from: https://rustup.rs/
    exit /b 1
)

REM Check if wasm32-unknown-unknown target is installed
rustup target list | findstr /C:"wasm32-unknown-unknown (installed)" >nul
if %ERRORLEVEL% NEQ 0 (
    echo 📦 Installing wasm32-unknown-unknown target...
    rustup target add wasm32-unknown-unknown
)

REM Build the contract
echo 🔨 Compiling contract to WASM...
cargo build --target wasm32-unknown-unknown --release

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Build successful!
    echo.
    echo 📦 WASM binary location:
    echo    target\wasm32-unknown-unknown\release\counter_contract.wasm
    echo.
    dir target\wasm32-unknown-unknown\release\counter_contract.wasm | findstr /C:"counter_contract.wasm"
    echo.
    echo 🎯 Next steps:
    echo    1. Run tests: scripts\test.bat
    echo    2. Deploy: scripts\deploy.bat
) else (
    echo.
    echo ❌ Build failed!
    exit /b 1
)
