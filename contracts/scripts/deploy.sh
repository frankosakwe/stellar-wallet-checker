#!/bin/bash

# Deploy script for Soroban smart contract
# Deploys the contract to Stellar Testnet

set -e

echo "🚀 Deploying Soroban Counter Contract to Testnet..."
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
OPTIMIZED_FILE="${WASM_FILE%.wasm}.optimized.wasm"

if [ -f "$OPTIMIZED_FILE" ]; then
    DEPLOY_FILE=$OPTIMIZED_FILE
    echo "📦 Using optimized WASM binary"
elif [ -f "$WASM_FILE" ]; then
    DEPLOY_FILE=$WASM_FILE
    echo "📦 Using standard WASM binary (consider optimizing first)"
else
    echo "❌ Error: WASM binary not found"
    echo "Please build the contract first: ./scripts/build.sh"
    exit 1
fi

echo ""

# Check if testnet network is configured
if ! soroban network ls | grep -q "testnet"; then
    echo "⚙️  Configuring testnet network..."
    soroban network add testnet \
        --rpc-url https://soroban-testnet.stellar.org:443 \
        --network-passphrase "Test SDF Network ; September 2015"
    echo "✅ Testnet network configured"
fi

# Check if identity exists
IDENTITY="deployer"
if ! soroban keys ls | grep -q "$IDENTITY"; then
    echo ""
    echo "🔑 No deployer identity found. Creating one..."
    echo "⚠️  Please save the generated secret key securely!"
    echo ""
    soroban keys generate $IDENTITY --network testnet
    
    # Get the public key
    PUBLIC_KEY=$(soroban keys address $IDENTITY)
    echo ""
    echo "✅ Identity created"
    echo "📋 Public Key: $PUBLIC_KEY"
    echo ""
    echo "💰 Funding account with testnet XLM..."
    soroban keys fund $IDENTITY --network testnet
    
    if [ $? -eq 0 ]; then
        echo "✅ Account funded"
    else
        echo "⚠️  Auto-funding failed. Please fund manually:"
        echo "   Visit: https://laboratory.stellar.org/#account-creator?network=test"
        echo "   Public Key: $PUBLIC_KEY"
        read -p "Press Enter after funding your account..."
    fi
fi

echo ""
echo "🚀 Deploying contract to Stellar Testnet..."
echo ""

# Deploy the contract
CONTRACT_ID=$(soroban contract deploy \
    --wasm $DEPLOY_FILE \
    --source $IDENTITY \
    --network testnet)

# Check if deployment succeeded
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Contract deployed successfully!"
    echo ""
    echo "📜 Contract ID:"
    echo "   $CONTRACT_ID"
    echo ""
    echo "🔍 View on Stellar Expert:"
    echo "   https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"
    echo ""
    echo "📝 Update your frontend configuration:"
    echo "   File: src/contractConfig.js"
    echo "   Replace CONTRACT_ADDRESS with: $CONTRACT_ID"
    echo ""
    echo "🎯 Test the deployment:"
    echo "   soroban contract invoke \\"
    echo "     --id $CONTRACT_ID \\"
    echo "     --source $IDENTITY \\"
    echo "     --network testnet \\"
    echo "     -- increment"
    echo ""
    
    # Save contract ID to file
    echo $CONTRACT_ID > .contract-id
    echo "💾 Contract ID saved to .contract-id"
    
else
    echo ""
    echo "❌ Deployment failed!"
    exit 1
fi
