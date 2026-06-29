@echo off
REM Test script for Soroban smart contract (Windows)
REM Runs all contract tests

echo.
echo 🧪 Testing Soroban Counter Contract...
echo.

REM Check if we're in the contracts directory
if not exist "Cargo.toml" (
    echo ❌ Error: Cargo.toml not found
    echo Please run this script from the contracts\ directory
    exit /b 1
)

REM Run tests
echo 🧪 Running test suites...
cargo test

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ All tests passed!
    echo.
    echo 📊 Test coverage:
    echo    - increment^(^) function tests
    echo    - get_count^(^) function tests
    echo    - reset^(^) function tests
    echo    - increment_by^(^) function tests
    echo    - Multiple operation tests
    echo.
) else (
    echo.
    echo ❌ Tests failed!
    exit /b 1
)
