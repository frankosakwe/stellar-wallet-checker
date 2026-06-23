import { describe, it, expect } from 'vitest'

// Helper functions to test
const formatAddress = (address) => {
  if (!address) return ''
  if (address.length <= 16) return address
  return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`
}

const validateStellarAddress = (address) => {
  if (!address) return false
  const pattern = /^G[A-Z0-9]{55}$/
  return pattern.test(address)
}

const formatBalance = (balance) => {
  if (balance === null || balance === undefined) return '0.0000000'
  return parseFloat(balance).toFixed(7)
}

describe('Utility Functions', () => {
  describe('formatAddress', () => {
    it('formats long addresses correctly', () => {
      const address = 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
      const formatted = formatAddress(address)
      expect(formatted).toBe('GXXXXXXX...XXXXXXXX')
    })

    it('returns short addresses as-is', () => {
      const address = 'SHORT'
      const formatted = formatAddress(address)
      expect(formatted).toBe('SHORT')
    })

    it('handles empty address', () => {
      const formatted = formatAddress('')
      expect(formatted).toBe('')
    })

    it('handles null address', () => {
      const formatted = formatAddress(null)
      expect(formatted).toBe('')
    })
  })

  describe('validateStellarAddress', () => {
    it('validates correct Stellar address', () => {
      const address = 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
      expect(validateStellarAddress(address)).toBe(true)
    })

    it('rejects address not starting with G', () => {
      const address = 'AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
      expect(validateStellarAddress(address)).toBe(false)
    })

    it('rejects address with wrong length', () => {
      const address = 'GXXXX'
      expect(validateStellarAddress(address)).toBe(false)
    })

    it('rejects empty address', () => {
      expect(validateStellarAddress('')).toBe(false)
    })

    it('rejects null address', () => {
      expect(validateStellarAddress(null)).toBe(false)
    })
  })

  describe('formatBalance', () => {
    it('formats balance with 7 decimal places', () => {
      expect(formatBalance(100)).toBe('100.0000000')
      expect(formatBalance(10.5)).toBe('10.5000000')
      expect(formatBalance(0.1234567)).toBe('0.1234567')
    })

    it('handles zero balance', () => {
      expect(formatBalance(0)).toBe('0.0000000')
    })

    it('handles null balance', () => {
      expect(formatBalance(null)).toBe('0.0000000')
    })

    it('handles undefined balance', () => {
      expect(formatBalance(undefined)).toBe('0.0000000')
    })

    it('rounds correctly', () => {
      expect(formatBalance(10.12345678)).toBe('10.1234568')
    })
  })
})
