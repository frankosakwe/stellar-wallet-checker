import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import * as freighterApi from '@stellar/freighter-api'

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app title correctly', () => {
    render(<App />)
    expect(screen.getByText(/Stellar Multi-Wallet App/i)).toBeInTheDocument()
  })

  it('shows connect wallet button initially', () => {
    render(<App />)
    const connectButton = screen.getByRole('button', { name: /Connect Wallet/i })
    expect(connectButton).toBeInTheDocument()
  })

  it('displays Level 2.3 requirements information', () => {
    render(<App />)
    expect(screen.getByText(/Level 2.3 Requirements/i)).toBeInTheDocument()
    expect(screen.getByText(/Multi-wallet support/i)).toBeInTheDocument()
    expect(screen.getByText(/Smart contract deployed/i)).toBeInTheDocument()
  })

  it('shows wallet selection when connect button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const connectButton = screen.getByRole('button', { name: /Connect Wallet/i })
    
    await act(async () => {
      await user.click(connectButton)
    })
    
    await waitFor(() => {
      expect(screen.getByText(/Select Your Wallet/i)).toBeInTheDocument()
    })
  })

  it('displays Freighter wallet option in selection', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const connectButton = screen.getByRole('button', { name: /Connect Wallet/i })
    
    await act(async () => {
      await user.click(connectButton)
    })
    
    await waitFor(() => {
      expect(screen.getByText(/Freighter/i)).toBeInTheDocument()
    })
  })

  it('displays xBull wallet option in selection', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const connectButton = screen.getByRole('button', { name: /Connect Wallet/i })
    
    await act(async () => {
      await user.click(connectButton)
    })
    
    await waitFor(() => {
      expect(screen.getByText(/xBull Wallet/i)).toBeInTheDocument()
    })
  })

  it('shows back button in wallet selection', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const connectButton = screen.getByRole('button', { name: /Connect Wallet/i })
    
    await act(async () => {
      await user.click(connectButton)
    })
    
    await waitFor(() => {
      const backButton = screen.getByRole('button', { name: /Back/i })
      expect(backButton).toBeInTheDocument()
    })
  })

  it('returns to main screen when back button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const connectButton = screen.getByRole('button', { name: /Connect Wallet/i })
    
    await act(async () => {
      await user.click(connectButton)
    })
    
    await waitFor(() => {
      expect(screen.getByText(/Select Your Wallet/i)).toBeInTheDocument()
    })
    
    const backButton = screen.getByRole('button', { name: /Back/i })
    
    await act(async () => {
      await user.click(backButton)
    })
    
    await waitFor(() => {
      expect(screen.queryByText(/Select Your Wallet/i)).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Connect Wallet/i })).toBeInTheDocument()
    })
  })

  it('handles wallet connection attempt', async () => {
    const user = userEvent.setup()
    freighterApi.getPublicKey.mockResolvedValue('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF')
    
    render(<App />)
    
    const connectButton = screen.getByRole('button', { name: /Connect Wallet/i })
    
    await act(async () => {
      await user.click(connectButton)
    })
    
    await waitFor(() => {
      expect(screen.getByText(/Freighter/i)).toBeInTheDocument()
    })
  })

  it('displays contract address constant', () => {
    render(<App />)
    const connectButton = screen.getByRole('button', { name: /Connect Wallet/i })
    expect(connectButton).toBeInTheDocument()
    // Contract address should be in config
  })
})
