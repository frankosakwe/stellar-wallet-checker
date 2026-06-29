# Smart Contract Deployment Guide

Complete guide to building, testing, and deploying the counter smart contract.

---

## 📋 Prerequisites

### 1. Install Rust

**Windows:**
Download from https://rustup.rs/ and run the installer.

**macOS/Linux:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Verify installation:
```bash
rustc --version
cargo --version
```

### 2. Install Soroban CLI

```bash
cargo install --locked soroban-cli --features opt
```

Verify installation:
```bash
soroban --version
```

### 3. Add WebAssembly Target

```bash
rustup target add wasm32-unknown-unknown
```

---

## 🔨 Building the Contract

### Step 1: Navigate to Contracts Directory

```bash
cd contracts
```

### Step 2: Build the Contract

```bash
cargo build --target wasm32-unknown-unknown --release
```

**Output location:**
```
target/wasm32-unknown-unknown/release/counter_contract.wasm
```

### Step 3: Optimize (Optional but Recommended)

```bash
soroban contract optimize \
  --wasm target/wasm32-unknown-unknown/release/counter_contract.wasm
```

This creates an optimized version with smaller size and lower gas costs.

---

## 🧪 Testing the Contract

### Run All Tests

```bash
cargo test
```

### Run Tests with Details

```bash
cargo test -- --nocapture
```

### Run Specific Test

```bash
cargo test test_increment
```

### Expected Output

```
running 5 tests
test test::test_increment ... ok
test test::test_get_count ... ok
test test::test_reset ... ok
test test::test_increment_by ... ok
test test::test_multiple_operations ... ok

test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

---

## 🚀 Deployment to Stellar Testnet

### Step 1: Configure Network

```bash
soroban network add testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015"
```

### Step 2: Generate Identity

```bash
soroban keys generate deployer --network testnet
```

This creates a new keypair for deployment.

### Step 3: Get Public Key

```bash
soroban keys address deployer
```

Save this address - you'll need it!

### Step 4: Fund Your Account

```bash
soroban keys fund deployer --network testnet
```

Or manually fund at: https://laboratory.stellar.org/#account-creator?network=test

### Step 5: Deploy Contract

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/counter_contract.wasm \
  --source deployer \
  --network testnet
```

**Example Output:**
```
CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW
```

This is your contract address! Save it.

### Step 6: Verify Deployment

Visit Stellar Expert:
```
https://stellar.expert/explorer/testnet/contract/YOUR_CONTRACT_ADDRESS
```

---

## 🔌 Invoking Contract Functions

### Increment Counter

```bash
soroban contract invoke \
  --id CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW \
  --source deployer \
  --network testnet \
  -- increment
```

**Expected Output:**
```
1
```

### Get Current Count

```bash
soroban contract invoke \
  --id CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW \
  --source deployer \
  --network testnet \
  -- get_count
```

**Expected Output:**
```
1
```

### Reset Counter

```bash
soroban contract invoke \
  --id CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW \
  --source deployer \
  --network testnet \
  -- reset
```

**Expected Output:**
```
0
```

### Increment by Custom Amount

```bash
soroban contract invoke \
  --id CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW \
  --source deployer \
  --network testnet \
  -- increment_by --amount 5
```

**Expected Output:**
```
5
```

---

## 🔗 Update Frontend Configuration

After deployment, update the contract address in your frontend:

**File:** `src/contractConfig.js`

```javascript
export const CONTRACT_CONFIG = {
  contractAddress: 'YOUR_NEW_CONTRACT_ADDRESS',
  networkPassphrase: 'Test SDF Network ; September 2015',
  horizonUrl: 'https://horizon-testnet.stellar.org',
  sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
};
```

---

## 📊 Deployment Verification Checklist

- [ ] Contract builds successfully
- [ ] All 5 tests pass
- [ ] WASM file generated
- [ ] Soroban CLI configured
- [ ] Identity created and funded
- [ ] Contract deployed to testnet
- [ ] Contract address saved
- [ ] Functions callable via CLI
- [ ] Verified on Stellar Expert
- [ ] Frontend config updated

---

## 🛠️ Troubleshooting

### Build Fails

**Problem:** `error: linker 'rust-lld' not found`

**Solution:**
```bash
rustup update
rustup target add wasm32-unknown-unknown
```

### Soroban CLI Not Found

**Problem:** `command not found: soroban`

**Solution:**
```bash
cargo install --locked soroban-cli
# Add cargo bin to PATH
export PATH="$HOME/.cargo/bin:$PATH"
```

### Deployment Fails: Insufficient Balance

**Problem:** `error: account has insufficient balance`

**Solution:**
```bash
# Fund your account
soroban keys fund deployer --network testnet

# Or use Friendbot
curl "https://friendbot.stellar.org?addr=$(soroban keys address deployer)"
```

### Contract Invocation Fails

**Problem:** `error: contract not found`

**Solution:**
- Verify contract address is correct
- Check network configuration (testnet vs public)
- Ensure contract was deployed successfully

### Tests Fail

**Problem:** Tests don't compile or fail

**Solution:**
```bash
# Update dependencies
cargo update

# Clean and rebuild
cargo clean
cargo build --target wasm32-unknown-unknown --release
cargo test
```

---

## 📈 Gas Cost Estimation

| Operation | Approximate Cost | Notes |
|-----------|------------------|-------|
| Deploy | ~10,000 XLM | One-time cost |
| Increment | ~0.001 XLM | Per transaction |
| Get Count | ~0.0001 XLM | Read-only |
| Reset | ~0.001 XLM | Per transaction |

*Costs on testnet are free. Mainnet costs will vary.*

---

## 🔒 Security Checklist

Before deploying to mainnet:

- [ ] Code reviewed by multiple developers
- [ ] All tests passing
- [ ] No compiler warnings
- [ ] Input validation implemented
- [ ] Access control reviewed
- [ ] Integer overflow protection verified
- [ ] Gas costs optimized
- [ ] Formal audit completed (for production)

---

## 🌐 Deploying to Mainnet (Production)

**⚠️ WARNING:** Deploying to mainnet involves real XLM. Ensure thorough testing first.

### Step 1: Configure Mainnet Network

```bash
soroban network add mainnet \
  --rpc-url https://soroban-rpc.stellar.org:443 \
  --network-passphrase "Public Global Stellar Network ; September 2015"
```

### Step 2: Create Production Identity

```bash
soroban keys generate mainnet-deployer --network mainnet
```

### Step 3: Fund Account

Purchase XLM from an exchange and send to:
```bash
soroban keys address mainnet-deployer
```

### Step 4: Deploy

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/counter_contract.wasm \
  --source mainnet-deployer \
  --network mainnet
```

### Step 5: Update Frontend for Mainnet

```javascript
export const CONTRACT_CONFIG = {
  contractAddress: 'YOUR_MAINNET_CONTRACT_ADDRESS',
  networkPassphrase: 'Public Global Stellar Network ; September 2015',
  horizonUrl: 'https://horizon.stellar.org',
  sorobanRpcUrl: 'https://soroban-rpc.stellar.org',
};
```

---

## 📚 Additional Resources

- **Soroban Documentation:** https://soroban.stellar.org/docs
- **Stellar SDK:** https://developers.stellar.org/
- **Rust Book:** https://doc.rust-lang.org/book/
- **Soroban Examples:** https://github.com/stellar/soroban-examples
- **Stellar Discord:** https://discord.gg/stellar

---

## 🎯 Quick Commands Reference

```bash
# Build
cargo build --target wasm32-unknown-unknown --release

# Test
cargo test

# Deploy
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/counter_contract.wasm --source deployer --network testnet

# Invoke
soroban contract invoke --id CONTRACT_ID --source deployer --network testnet -- increment

# Get contract info
soroban contract inspect --wasm target/wasm32-unknown-unknown/release/counter_contract.wasm
```

---

**Deployment Status:** ✅ Successfully Deployed to Testnet

**Contract Address:** CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW

**Last Updated:** June 2026
