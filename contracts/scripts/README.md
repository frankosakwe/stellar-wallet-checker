# 📜 Soroban Smart Contract Deployment Scripts

Automated scripts for building, testing, optimizing, deploying, and invoking the Soroban Counter Contract.

---

## 📋 Available Scripts

| Script | Purpose | Platform |
|--------|---------|----------|
| `build.sh` | Build contract WASM binary | Linux/Mac/WSL |
| `test.sh` | Run all contract tests | Linux/Mac/WSL |
| `optimize.sh` | Optimize WASM for deployment | Linux/Mac/WSL |
| `deploy.sh` | Deploy contract to testnet | Linux/Mac/WSL |
| `invoke.sh` | Invoke contract functions | Linux/Mac/WSL |
| `build.bat` | Build contract WASM binary | Windows |
| `test.bat` | Run all contract tests | Windows |
| `deploy.bat` | Deploy contract to testnet | Windows |

---

## 🚀 Quick Start

### Prerequisites

1. **Rust & Cargo** - [Install from rustup.rs](https://rustup.rs/)
2. **Soroban CLI** - Install via: `cargo install --locked soroban-cli`
3. **wasm32 target** - Install via: `rustup target add wasm32-unknown-unknown`

### Basic Workflow

```bash
# 1. Build the contract
./scripts/build.sh

# 2. Run tests
./scripts/test.sh

# 3. Optimize WASM
./scripts/optimize.sh

# 4. Deploy to testnet
./scripts/deploy.sh

# 5. Test deployment
./scripts/invoke.sh increment
```

---

## 📖 Script Documentation

### 1. build.sh / build.bat

**Purpose:** Compiles the Soroban contract to WebAssembly (WASM) binary.

**Usage:**
```bash
# Linux/Mac/WSL
cd contracts
./scripts/build.sh

# Windows
cd contracts
scripts\build.bat
```

**What it does:**
- ✅ Verifies Rust/Cargo is installed
- ✅ Checks for wasm32-unknown-unknown target
- ✅ Compiles contract to WASM
- ✅ Shows binary size and location
- ✅ Provides next steps

**Output:**
```
target/wasm32-unknown-unknown/release/counter_contract.wasm
```

**Expected Output:**
```
🔨 Building Soroban Counter Contract...
✅ Build successful!
📦 WASM binary location:
   target/wasm32-unknown-unknown/release/counter_contract.wasm
```

---

### 2. test.sh / test.bat

**Purpose:** Runs all contract test suites.

**Usage:**
```bash
# Linux/Mac/WSL
cd contracts
./scripts/test.sh

# Windows
cd contracts
scripts\test.bat
```

**What it does:**
- ✅ Runs all Rust tests via `cargo test`
- ✅ Tests increment() function
- ✅ Tests get_count() function
- ✅ Tests reset() function
- ✅ Tests increment_by() function
- ✅ Shows test coverage summary

**Expected Output:**
```
🧪 Testing Soroban Counter Contract...
✅ All tests passed!
📊 Test coverage:
   - increment() function tests
   - get_count() function tests
   - reset() function tests
   - increment_by() function tests
```

---

### 3. optimize.sh

**Purpose:** Optimizes the WASM binary for smaller size and deployment.

**Usage:**
```bash
cd contracts
./scripts/optimize.sh
```

**What it does:**
- ✅ Verifies Soroban CLI is installed
- ✅ Checks WASM binary exists
- ✅ Optimizes binary using `soroban contract optimize`
- ✅ Shows size comparison (before/after)
- ✅ Creates `.optimized.wasm` file

**Output:**
```
target/wasm32-unknown-unknown/release/counter_contract.optimized.wasm
```

**Expected Output:**
```
⚡ Optimizing Soroban Counter Contract...
📦 Original binary size: 500K
✅ Optimization successful!
📊 Results:
   Original:  500K
   Optimized: 100K
```

**Note:** Optimization can reduce WASM size by 70-90%!

---

### 4. deploy.sh / deploy.bat

**Purpose:** Deploys the contract to Stellar Testnet.

**Usage:**
```bash
# Linux/Mac/WSL
cd contracts
./scripts/deploy.sh

# Windows
cd contracts
scripts\deploy.bat
```

**What it does:**
- ✅ Configures Stellar Testnet network
- ✅ Generates deployer identity (if needed)
- ✅ Funds account with testnet XLM
- ✅ Deploys contract to testnet
- ✅ Saves contract ID to `.contract-id` file
- ✅ Provides Stellar Expert link
- ✅ Shows how to update frontend

**Expected Output:**
```
🚀 Deploying Soroban Counter Contract to Testnet...
✅ Contract deployed successfully!
📜 Contract ID:
   CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW
🔍 View on Stellar Expert:
   https://stellar.expert/explorer/testnet/contract/CCWVVZGR3...
```

**Important Notes:**
- Creates a `deployer` identity for signing transactions
- Automatically funds account with testnet XLM
- Saves contract ID to `.contract-id` for later use
- Uses optimized WASM if available, otherwise uses standard build

---

### 5. invoke.sh

**Purpose:** Invokes contract functions on the deployed contract.

**Usage:**
```bash
cd contracts

# Increment counter by 1
./scripts/invoke.sh increment

# Get current count
./scripts/invoke.sh get_count

# Reset counter to 0
./scripts/invoke.sh reset

# Increment by custom amount
./scripts/invoke.sh increment_by 10
```

**Available Functions:**

| Function | Arguments | Description |
|----------|-----------|-------------|
| `increment` | None | Increment counter by 1 |
| `get_count` | None | Get current counter value |
| `reset` | None | Reset counter to 0 |
| `increment_by` | amount (number) | Increment by custom amount |

**Examples:**
```bash
# Basic increment
./scripts/invoke.sh increment
# Result: 1

# Increment by 5
./scripts/invoke.sh increment_by 5
# Result: 6

# Get current value
./scripts/invoke.sh get_count
# Result: 6

# Reset to zero
./scripts/invoke.sh reset
# Result: 0
```

**Expected Output:**
```
🎯 Invoking Soroban Contract Function...
📜 Contract ID: CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW
🔧 Function: increment
✅ Function call successful!
📊 Result:
   1
```

**Note:** Automatically uses contract ID from `.contract-id` file or falls back to default deployed contract.

---

## 🪟 Windows Batch Scripts

### build.bat

```batch
cd contracts
cargo build --target wasm32-unknown-unknown --release
```

### test.bat

```batch
cd contracts
cargo test
```

### deploy.bat

Requires manual steps since full automation is not possible in batch:

```batch
@echo off
echo Deploying to Testnet...
echo.
echo Step 1: Configure network (if not done)
echo soroban network add testnet --rpc-url https://soroban-testnet.stellar.org:443 --network-passphrase "Test SDF Network ; September 2015"
echo.
echo Step 2: Generate identity (if needed)
echo soroban keys generate deployer --network testnet
echo.
echo Step 3: Fund account
echo soroban keys fund deployer --network testnet
echo.
echo Step 4: Deploy contract
soroban contract deploy --wasm target\wasm32-unknown-unknown\release\counter_contract.wasm --source deployer --network testnet
```

---

## 🔧 Troubleshooting

### Script Permission Denied (Linux/Mac)

**Error:**
```
bash: ./scripts/build.sh: Permission denied
```

**Fix:**
```bash
chmod +x scripts/*.sh
```

### Rust Not Found

**Error:**
```
cargo: command not found
```

**Fix:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### Soroban CLI Not Found

**Error:**
```
soroban: command not found
```

**Fix:**
```bash
cargo install --locked soroban-cli
```

### wasm32 Target Missing

**Error:**
```
error[E0463]: can't find crate for `core`
```

**Fix:**
```bash
rustup target add wasm32-unknown-unknown
```

### Account Funding Failed

**Error:**
```
Auto-funding failed
```

**Manual Fix:**
1. Get your public key: `soroban keys address deployer`
2. Visit: https://laboratory.stellar.org/#account-creator?network=test
3. Paste public key and click "Get test network lumens"

### Deploy Script Can't Find WASM

**Error:**
```
❌ Error: WASM binary not found
```

**Fix:**
```bash
./scripts/build.sh
```

---

## 📝 Script Details

### Environment Variables

Scripts respect these environment variables:

| Variable | Purpose | Default |
|----------|---------|---------|
| `IDENTITY` | Deployer identity name | `deployer` |
| `NETWORK` | Target network | `testnet` |
| `CONTRACT_ID` | Contract to invoke | From `.contract-id` or default |

**Example:**
```bash
IDENTITY=mykey ./scripts/deploy.sh
```

### Generated Files

Scripts create these files:

| File | Purpose |
|------|---------|
| `.contract-id` | Stores deployed contract ID |
| `target/` | Rust build artifacts |
| `Cargo.lock` | Dependency lock file |

**Note:** `.contract-id` is gitignored - don't commit it!

---

## 🔄 Complete Workflow Example

### First-Time Setup

```bash
# 1. Install prerequisites
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install --locked soroban-cli
rustup target add wasm32-unknown-unknown

# 2. Make scripts executable (Linux/Mac)
cd contracts
chmod +x scripts/*.sh

# 3. Build contract
./scripts/build.sh

# 4. Run tests
./scripts/test.sh

# 5. Optimize
./scripts/optimize.sh

# 6. Deploy
./scripts/deploy.sh
# Save the contract ID that's printed!

# 7. Test deployment
./scripts/invoke.sh increment
./scripts/invoke.sh get_count
```

### Development Workflow

```bash
# After making code changes:

# 1. Run tests
./scripts/test.sh

# 2. Rebuild
./scripts/build.sh

# 3. Deploy new version
./scripts/deploy.sh

# 4. Update frontend with new contract ID
# Edit: src/contractConfig.js
```

---

## 🌐 Network Configuration

Scripts use these endpoints:

| Network | RPC URL | Network Passphrase |
|---------|---------|-------------------|
| Testnet | https://soroban-testnet.stellar.org:443 | Test SDF Network ; September 2015 |

**Switch to different network:**
```bash
soroban network add mynetwork \
  --rpc-url https://custom-rpc.example.com \
  --network-passphrase "Custom Network"
```

---

## 📊 Gas Costs

Approximate gas costs for each operation:

| Operation | Gas Cost | Notes |
|-----------|----------|-------|
| Deploy | ~50,000 | One-time cost |
| increment() | ~2,000 | Includes storage write |
| get_count() | ~1,000 | Read-only |
| reset() | ~2,000 | Includes storage write |
| increment_by(n) | ~2,000 | Same as increment |

**Note:** Testnet operations are free!

---

## 🔗 Resources

- **Soroban CLI Docs**: https://soroban.stellar.org/docs/tools/cli
- **Deployment Guide**: ../DEPLOYMENT.md
- **Contract Source**: ../src/lib.rs
- **Main README**: ../../README_V2.md

---

## 🎯 Next Steps

After deploying:

1. **Update Frontend Configuration:**
   ```javascript
   // File: src/contractConfig.js
   export const CONTRACT_ADDRESS = 'YOUR_NEW_CONTRACT_ID';
   ```

2. **Test in Browser:**
   - Visit: http://localhost:3000
   - Connect Freighter wallet
   - Click "Increment Counter"
   - Verify transaction on Stellar Expert

3. **Monitor Contract:**
   - View on Stellar Expert
   - Check transaction history
   - Monitor gas usage

---

## ✅ Script Checklist

Before deployment, verify:

- [ ] Rust and Cargo installed
- [ ] Soroban CLI installed
- [ ] wasm32-unknown-unknown target added
- [ ] Scripts have execute permissions (Linux/Mac)
- [ ] Contract builds successfully
- [ ] All tests pass
- [ ] Deployer identity created and funded

---

**Scripts Version:** 1.0.0  
**Last Updated:** June 2026  
**Tested On:** Stellar Testnet

---

*Happy Deploying! 🚀*
