# Smart Contract Deployment Guide

This document explains the smart contract used in this project and how to deploy it.

## Contract Overview

We're using a simple **Counter Contract** deployed on Stellar Testnet using Soroban (Stellar's smart contract platform).

**Contract Functions:**
- `increment()` - Increases the counter by 1
- `get_count()` - Returns the current count value

## Deployed Contract Information

**Contract Address:** `CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW`

**Network:** Stellar Testnet

**Contract ID (Hex):** Will be displayed in the app after deployment

## How to Deploy Your Own Contract

### Option 1: Use the Deployed Contract (Recommended)

The contract is already deployed on testnet. You can use it directly in the application.

### Option 2: Deploy Your Own Contract

If you want to deploy your own instance:

1. **Install Stellar CLI**:
```bash
cargo install --locked stellar-cli --features opt
```

2. **Create Contract** (counter.rs):
```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol};

const COUNTER: Symbol = symbol_short!("COUNTER");

#[contract]
pub struct CounterContract;

#[contractimpl]
impl CounterContract {
    pub fn increment(env: Env) -> u32 {
        let mut count: u32 = env.storage().instance().get(&COUNTER).unwrap_or(0);
        count += 1;
        env.storage().instance().set(&COUNTER, &count);
        count
    }

    pub fn get_count(env: Env) -> u32 {
        env.storage().instance().get(&COUNTER).unwrap_or(0)
    }
}
```

3. **Build Contract**:
```bash
stellar contract build
```

4. **Deploy to Testnet**:
```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/counter.wasm \
  --source YOUR_SECRET_KEY \
  --network testnet
```

5. **Update Contract Address** in `src/contractConfig.js`

## Contract Usage in the App

The application interacts with the contract through:

1. **Increment Counter**: User clicks button → Transaction sent → Counter increases
2. **Get Count**: Application automatically fetches current count
3. **Transaction Events**: Real-time updates when contract state changes

## Testing the Contract

You can test the deployed contract using Stellar CLI:

```bash
# Get current count
stellar contract invoke \
  --id CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW \
  --source YOUR_SECRET_KEY \
  --network testnet \
  -- get_count

# Increment counter
stellar contract invoke \
  --id CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW \
  --source YOUR_SECRET_KEY \
  --network testnet \
  -- increment
```

## Contract on Stellar Expert

View the contract on Stellar Expert:
https://stellar.expert/explorer/testnet/contract/CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW

## Error Handling

The application handles these contract-related errors:

- **Contract Not Found**: Invalid contract address
- **Insufficient Balance**: Not enough XLM for transaction fees
- **Network Errors**: Connection issues with Stellar network
- **Transaction Failed**: Contract invocation failed
- **Timeout**: Transaction took too long to confirm

## Resources

- [Soroban Documentation](https://soroban.stellar.org/)
- [Stellar CLI](https://github.com/stellar/stellar-cli)
- [Soroban Examples](https://github.com/stellar/soroban-examples)
