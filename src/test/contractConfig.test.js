import { describe, it, expect } from 'vitest'
import {
  CONTRACT_ADDRESS,
  CONTRACT_ID,
  NETWORK_PASSPHRASE,
  HORIZON_URL,
  SOROBAN_RPC_URL,
  CONTRACT_FUNCTIONS,
  TX_CONFIG
} from '../contractConfig'

describe('Contract Configuration', () => {
  it('has a valid contract address', () => {
    expect(CONTRACT_ADDRESS).toBeDefined()
    expect(typeof CONTRACT_ADDRESS).toBe('string')
    expect(CONTRACT_ADDRESS.length).toBeGreaterThan(0)
    expect(CONTRACT_ADDRESS).toMatch(/^C[A-Z0-9]{55}$/)
  })

  it('has a valid contract ID in hex format', () => {
    expect(CONTRACT_ID).toBeDefined()
    expect(typeof CONTRACT_ID).toBe('string')
    expect(CONTRACT_ID).toMatch(/^[a-f0-9]{64}$/)
  })

  it('uses correct testnet network passphrase', () => {
    expect(NETWORK_PASSPHRASE).toBe('Test SDF Network ; September 2015')
  })

  it('uses correct Horizon testnet URL', () => {
    expect(HORIZON_URL).toBe('https://horizon-testnet.stellar.org')
  })

  it('uses correct Soroban RPC URL', () => {
    expect(SOROBAN_RPC_URL).toBe('https://soroban-testnet.stellar.org')
  })

  it('defines contract functions', () => {
    expect(CONTRACT_FUNCTIONS).toBeDefined()
    expect(CONTRACT_FUNCTIONS.INCREMENT).toBe('increment')
    expect(CONTRACT_FUNCTIONS.GET_COUNT).toBe('get_count')
  })

  it('defines transaction configuration', () => {
    expect(TX_CONFIG).toBeDefined()
    expect(TX_CONFIG.FEE).toBe('100000')
    expect(TX_CONFIG.TIMEOUT).toBe(180)
  })

  it('exports all required configuration', () => {
    const config = {
      CONTRACT_ADDRESS,
      CONTRACT_ID,
      NETWORK_PASSPHRASE,
      HORIZON_URL,
      SOROBAN_RPC_URL,
      CONTRACT_FUNCTIONS,
      TX_CONFIG
    }
    
    Object.values(config).forEach(value => {
      expect(value).toBeDefined()
    })
  })
})
