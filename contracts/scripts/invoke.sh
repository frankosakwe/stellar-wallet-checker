#!/bin/bash

# Invoke script for Soroban smart contract
# Invokes contract functions on Stellar Testnet

set -e

# Default values
IDENTITY="deployer"
FUNCTION=${1:-"increment"}

# Check if contract ID file exists
if [ -f ".contract-id" ]; then
    CONTRACT_ID=$(cat .contract-id)
else
    # Use the deployed contract ID
    CONTRACT_ID="CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW"
fi

echo "🎯 Invoking Soroban Contract Function..."
echo ""
echo "📜 Contract ID: $CONTRACT_ID"
echo "🔧 Function: $FUNCTION"
echo ""

# Check if soroban CLI is installed
if ! command -v soroban &> /dev/null; then
    echo "❌ Error: Soroban CLI not found"
    echo "Please install it: cargo install --locked soroban-cli"
    exit 1
fi

# Invoke the contract
case $FUNCTION in
    increment)
        echo "➕ Calling increment()..."
        RESULT=$(soroban contract invoke \
            --id $CONTRACT_ID \
            --source $IDENTITY \
            --network testnet \
            -- increment)
        ;;
    
    get_count)
        echo "📊 Calling get_count()..."
        RESULT=$(soroban contract invoke \
            --id $CONTRACT_ID \
            --source $IDENTITY \
            --network testnet \
            -- get_count)
        ;;
    
    reset)
        echo "🔄 Calling reset()..."
        RESULT=$(soroban contract invoke \
            --id $CONTRACT_ID \
            --source $IDENTITY \
            --network testnet \
            -- reset)
        ;;
    
    increment_by)
        AMOUNT=${2:-5}
        echo "➕ Calling increment_by($AMOUNT)..."
        RESULT=$(soroban contract invoke \
            --id $CONTRACT_ID \
            --source $IDENTITY \
            --network testnet \
            -- increment_by --amount $AMOUNT)
        ;;
    
    *)
        echo "❌ Unknown function: $FUNCTION"
        echo ""
        echo "Available functions:"
        echo "  - increment       : Increment counter by 1"
        echo "  - get_count       : Get current counter value"
        echo "  - reset           : Reset counter to 0"
        echo "  - increment_by N  : Increment counter by N"
        echo ""
        echo "Usage: ./scripts/invoke.sh [function] [args]"
        echo "Example: ./scripts/invoke.sh increment_by 10"
        exit 1
        ;;
esac

# Display result
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Function call successful!"
    echo ""
    echo "📊 Result:"
    echo "   $RESULT"
    echo ""
else
    echo ""
    echo "❌ Function call failed!"
    exit 1
fi
