#!/bin/bash

# Optimize script for Soroban smart contract
# Optimizes the WASM binary for deployment

set -e

echo "⚡ Optimizing Soroban Counter Contract..."
echo ""

# Check if we're in the contracts directory
if [ ! -f "Cargo.toml" ]; then
    echo "❌ Error: Cargo.toml not found"
    echo "Please run this script from the contracts/ directory"
    exit 1
fi

# Check if soroban CLI is installed
if ! command -v soroban &> /dev/null; then
    echo "❌ Error: Soroban CLI not found"
    echo "Please install it: cargo install --locked soroban-cli"
    exit 1
fi

# Check if WASM binary exists
WASM_FILE="target/wasm32-unknown-unknown/release/counter_contract.wasm"
if [ ! -f "$WASM_FILE" ]; then
    echo "❌ Error: WASM binary not found"
    echo "Please build the contract first: ./scripts/build.sh"
    exit 1
fi

# Get original size
ORIGINAL_SIZE=$(ls -lh $WASM_FILE | awk '{print $5}')

echo "📦 Original binary size: $ORIGINAL_SIZE"
echo ""

# Optimize the WASM binary
echo "⚡ Optimizing WASM binary..."
soroban contract optimize --wasm $WASM_FILE

# Check if optimization succeeded
if [ $? -eq 0 ]; then
    OPTIMIZED_FILE="${WASM_FILE%.wasm}.optimized.wasm"
    if [ -f "$OPTIMIZED_FILE" ]; then
        OPTIMIZED_SIZE=$(ls -lh $OPTIMIZED_FILE | awk '{print $5}')
        
        echo ""
        echo "✅ Optimization successful!"
        echo ""
        echo "📊 Results:"
        echo "   Original:  $ORIGINAL_SIZE"
        echo "   Optimized: $OPTIMIZED_SIZE"
        echo ""
        echo "📦 Optimized binary location:"
        echo "   $OPTIMIZED_FILE"
        echo ""
        echo "🎯 Next step:"
        echo "   Deploy: ./scripts/deploy.sh"
    fi
else
    echo ""
    echo "❌ Optimization failed!"
    exit 1
fi
