#!/bin/bash

# Test script for Soroban smart contract
# Runs all contract tests

set -e

echo "🧪 Testing Soroban Counter Contract..."
echo ""

# Check if we're in the contracts directory
if [ ! -f "Cargo.toml" ]; then
    echo "❌ Error: Cargo.toml not found"
    echo "Please run this script from the contracts/ directory"
    exit 1
fi

# Run tests
echo "🧪 Running test suites..."
cargo test

# Check if tests passed
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All tests passed!"
    echo ""
    echo "📊 Test coverage:"
    echo "   - increment() function tests"
    echo "   - get_count() function tests"
    echo "   - reset() function tests"
    echo "   - increment_by() function tests"
    echo "   - Multiple operation tests"
    echo ""
else
    echo ""
    echo "❌ Tests failed!"
    exit 1
fi
