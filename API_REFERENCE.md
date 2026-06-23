# 📚 API Reference

Complete API reference for the Stellar Multi-Wallet Application.

---

## 📋 Table of Contents

1. [Contract API](#contract-api)
2. [Component API](#component-api)
3. [Utility Functions](#utility-functions)
4. [Configuration](#configuration)
5. [Event System](#event-system)

---

## 🔷 Contract API

### Contract Address
```
CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW
```

### Contract Functions

#### `increment()`

Increments the counter by 1.

**Parameters:** None

**Returns:** `u32` - The new counter value

**Example:**
```javascript
const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
  fee: TX_CONFIG.FEE,
  networkPassphrase: networkPassphrase,
})
  .addOperation(/* contract invocation */)
  .setTimeout(TX_CONFIG.TIMEOUT)
  .build()
```

**Gas Cost:** ~100,000 stroops

---

#### `get_count()`

Returns the current counter value.

**Parameters:** None

**Returns:** `u32` - The current counter value

**Example:**
```javascript
// Query contract state
const count = await fetchContractCount()
```

**Gas Cost:** Minimal (read-only)

---

## 🧩 Component API

### App Component

Main application component managing wallet connections and contract interactions.

#### State Variables

```javascript
// Wallet State
const [walletType, setWalletType] = useState(null)
const [showWalletOptions, setShowWalletOptions] = useState(false)
const [walletConnected, setWalletConnected] = useState(false)
const [publicKey, setPublicKey] = useState('')
const [balance, setBalance] = useState(null)

// Transaction State
const [destinationAddress, setDestinationAddress] = useState('')
const [amount, setAmount] = useState('')
const [txStatus, setTxStatus] = useState(null)
const [txHash, setTxHash] = useState('')

// Contract State
const [contractCount, setContractCount] = useState(0)
const [contractTxHash, setContractTxHash] = useState('')

// Event State
const [eventLog, setEventLog] = useState([])
```

#### Methods

##### `handleConnectWallet(type: string)`

Connects to specified wallet type.

**Parameters:**
- `type` (string): Wallet type ('freighter' or 'xbull')

**Returns:** Promise<void>

**Example:**
```javascript
await handleConnectWallet('freighter')
```

**Errors:**
- `WalletConnectionError`: Wallet not found or rejected
- `NetworkError`: Unable to fetch account data

---

##### `handleDisconnectWallet()`

Disconnects current wallet and resets state.

**Parameters:** None

**Returns:** void

**Example:**
```javascript
handleDisconnectWallet()
```

---

##### `fetchBalance(publicKey: string)`

Fetches XLM balance for given public key.

**Parameters:**
- `publicKey` (string): Stellar public key

**Returns:** Promise<void>

**Side Effects:**
- Updates `balance` state
- Adds event to event log

**Example:**
```javascript
await fetchBalance('GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
```

**Errors:**
- `AccountNotFoundError`: Account not funded (404)
- `NetworkError`: Unable to reach Horizon

---

##### `handleIncrementContract()`

Invokes contract increment function.

**Parameters:** None

**Returns:** Promise<void>

**Side Effects:**
- Updates `contractCount` state
- Updates `contractTxHash` state
- Adds events to event log
- Refreshes balance after 2 seconds

**Example:**
```javascript
await handleIncrementContract()
```

**Errors:**
- `ContractCallError`: Contract invocation failed
- `SigningError`: User rejected transaction
- `InsufficientBalanceError`: Not enough XLM for fees

---

##### `handleSendTransaction(event: Event)`

Sends XLM payment transaction.

**Parameters:**
- `event` (Event): Form submit event

**Returns:** Promise<void>

**Side Effects:**
- Updates `txStatus` state
- Updates `txHash` state
- Clears form fields on success
- Refreshes balance after 2 seconds

**Example:**
```javascript
<form onSubmit={handleSendTransaction}>
  {/* form fields */}
</form>
```

**Errors:**
- `ValidationError`: Invalid inputs
- `InsufficientBalanceError`: Not enough XLM
- `NetworkError`: Transaction submission failed

---

##### `addEvent(message: string, type: string)`

Adds event to event log.

**Parameters:**
- `message` (string): Event message
- `type` (string): Event type ('success', 'error', 'info')

**Returns:** void

**Example:**
```javascript
addEvent('Wallet connected successfully', 'success')
addEvent('Transaction failed', 'error')
addEvent('Loading account data', 'info')
```

---

## 🛠 Utility Functions

### formatAddress(address: string)

Formats long Stellar address for display.

**Parameters:**
- `address` (string): Full Stellar address

**Returns:** string - Formatted address

**Example:**
```javascript
formatAddress('GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
// Returns: 'GXXXXXXX...XXXXXXXX'

formatAddress('SHORT')
// Returns: 'SHORT'
```

---

### validateStellarAddress(address: string)

Validates Stellar public key format.

**Parameters:**
- `address` (string): Address to validate

**Returns:** boolean

**Example:**
```javascript
validateStellarAddress('GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
// Returns: true

validateStellarAddress('INVALID')
// Returns: false
```

**Validation Rules:**
- Must start with 'G'
- Must be 56 characters long
- Must contain only uppercase alphanumeric

---

### formatBalance(balance: number)

Formats balance to 7 decimal places.

**Parameters:**
- `balance` (number | null): Balance amount

**Returns:** string

**Example:**
```javascript
formatBalance(100)
// Returns: '100.0000000'

formatBalance(10.5)
// Returns: '10.5000000'

formatBalance(null)
// Returns: '0.0000000'
```

---

## ⚙️ Configuration

### Contract Configuration

```javascript
// src/contractConfig.js

export const CONTRACT_ADDRESS = 'CCWVVZGR3DDKH2J7...'
export const CONTRACT_ID = '959562346190e8d3...'
export const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015'
export const HORIZON_URL = 'https://horizon-testnet.stellar.org'
export const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org'

export const CONTRACT_FUNCTIONS = {
  INCREMENT: 'increment',
  GET_COUNT: 'get_count'
}

export const TX_CONFIG = {
  FEE: '100000',
  TIMEOUT: 180
}
```

### Environment Variables

```env
VITE_NETWORK=testnet
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_CONTRACT_ADDRESS=CCWVVZGR3DDKH2J7...
```

---

## 📡 Event System

### Event Structure

```typescript
interface Event {
  id: number           // Timestamp
  message: string      // Event message
  type: 'success' | 'error' | 'info'
  timestamp: string    // Formatted time (HH:MM:SS)
}
```

### Event Types

| Type | Color | Use Case |
|------|-------|----------|
| `success` | 🟢 Green | Successful operations |
| `error` | 🔴 Red | Failed operations |
| `info` | 🔵 Blue | Informational messages |

### Event Examples

```javascript
// Success event
{
  id: 1703001234567,
  message: 'Wallet connected successfully',
  type: 'success',
  timestamp: '14:30:45'
}

// Error event
{
  id: 1703001234568,
  message: 'Transaction failed: insufficient balance',
  type: 'error',
  timestamp: '14:30:50'
}

// Info event
{
  id: 1703001234569,
  message: 'Fetching account balance...',
  type: 'info',
  timestamp: '14:30:55'
}
```

---

## 🔐 Security Considerations

### Private Keys
- **Never handled by application**
- All signing done through wallet extension
- No private key storage or transmission

### Input Validation
- All user inputs validated before processing
- Stellar address format verification
- Amount validation (positive numbers only)
- Balance checking before transactions

### Network Security
- HTTPS only
- Content Security Policy headers
- XSS protection
- CSRF protection

---

## 🌐 Network Endpoints

### Horizon API

**Base URL:** `https://horizon-testnet.stellar.org`

**Endpoints Used:**
- `GET /accounts/{account_id}` - Fetch account data
- `POST /transactions` - Submit transactions

### Soroban RPC

**Base URL:** `https://soroban-testnet.stellar.org`

**Endpoints:**
- Contract invocation
- Contract state queries

---

## 📊 Response Formats

### Account Response

```json
{
  "id": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_id": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sequence": "123456789",
  "balances": [
    {
      "balance": "10000.0000000",
      "asset_type": "native"
    }
  ]
}
```

### Transaction Response

```json
{
  "hash": "abc123...",
  "ledger": 12345,
  "successful": true,
  "result_xdr": "...",
  "envelope_xdr": "..."
}
```

---

## ⚠️ Error Codes

### Application Errors

| Code | Message | Cause | Solution |
|------|---------|-------|----------|
| `WALLET_NOT_FOUND` | Wallet not installed | Freighter not detected | Install Freighter extension |
| `CONNECTION_REJECTED` | Connection rejected | User denied connection | Retry connection |
| `ACCOUNT_NOT_FUNDED` | Account not funded | Account has 0 XLM | Fund account on testnet |
| `INSUFFICIENT_BALANCE` | Insufficient balance | Not enough XLM for transaction | Add more XLM |
| `INVALID_ADDRESS` | Invalid destination address | Address format wrong | Check address format |
| `TRANSACTION_FAILED` | Transaction failed | Network or validation error | Check transaction details |
| `CONTRACT_ERROR` | Contract call failed | Contract invocation error | Verify contract address |

---

## 🔄 State Flow

```
Initial State
     ↓
Connect Wallet → [walletConnected: true]
     ↓
Fetch Balance → [balance: number]
     ↓
Interact with Contract → [contractCount: number, contractTxHash: string]
     ↓
Send Transaction → [txStatus: 'success', txHash: string]
     ↓
Disconnect → [Reset to Initial State]
```

---

## 📚 Additional Resources

- [Stellar SDK Documentation](https://stellar.github.io/js-stellar-sdk/)
- [Freighter API Documentation](https://docs.freighter.app/)
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Horizon API Reference](https://developers.stellar.org/api)

---

**Last Updated**: December 2024
**API Version**: 3.0.0
**Contract Version**: 1.0.0
