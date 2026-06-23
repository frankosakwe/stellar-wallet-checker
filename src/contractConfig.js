// Deployed Soroban Smart Contract Configuration

// Counter Contract Address on Stellar Testnet
// This is a simple counter contract that increments and returns count
export const CONTRACT_ADDRESS = 'CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW'

// Alternative format (Contract ID in hex)
export const CONTRACT_ID = '959562346190e8d3a4f98b356b14156545d8e7ac6dbc31ae2c569934bfe3de36'

// Network Configuration
export const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015'
export const HORIZON_URL = 'https://horizon-testnet.stellar.org'
export const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org'

// Contract Functions
export const CONTRACT_FUNCTIONS = {
  INCREMENT: 'increment',
  GET_COUNT: 'get_count'
}

// Transaction Configuration
export const TX_CONFIG = {
  FEE: '100000', // 0.01 XLM
  TIMEOUT: 180, // 3 minutes
}

export default {
  CONTRACT_ADDRESS,
  CONTRACT_ID,
  NETWORK_PASSPHRASE,
  HORIZON_URL,
  SOROBAN_RPC_URL,
  CONTRACT_FUNCTIONS,
  TX_CONFIG
}
