#!/bin/bash

# Build script for Soroban smart contract
# This script builds the contract WASM binary

set -e

echo "🔨 Building Soroban Counter Contract..."
echo ""

# Check if we're in the contracts directory
if [ ! -f "Cargo.toml" ]; then
    echo "❌ Error: Cargo.toml not found"
    echo "Please run this script from the contracts/ directory"
    exit 1
fi

# Check if Rust is installed
if ! command -v cargo &> /dev/null; then
    echo "❌ Error: Cargo not found"
    echo "Please install Rust from: https://rustup.rs/"
    exit 1
fi

# Check if wasm32-unknown-unknown target is installed
if ! rustup target list | grep -q "wasm32-unknown-unknown (installed)"; then
    echo "📦 Installing wasm32-unknown-unknown target..."
    rustup target add wasm32-unknown-unknown
fi

# Build the contract
echo "🔨 Compiling contract to WASM..."
cargo build --target wasm32-unknown-unknown --release

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📦 WASM binary location:"
    echo "   target/wasm32-unknown-unknown/release/counter_contract.wasm"
    echo ""
    echo "📏 Binary size:"
    ls -lh target/wasm32-unknown-unknown/release/counter_contract.wasm | awk '{print "   " $5}'
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Run tests: ./scripts/test.sh"
    echo "   2. Optimize: ./scripts/optimize.sh"
    echo "   3. Deploy: ./scripts/deploy.sh"
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi
