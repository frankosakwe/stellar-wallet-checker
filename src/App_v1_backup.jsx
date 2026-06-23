import { useState, useEffect } from 'react'
import { isConnected, getPublicKey, signTransaction } from '@stellar/freighter-api'
import * as StellarSdk from 'stellar-sdk'
import { CONTRACT_ADDRESS, CONTRACT_FUNCTIONS, TX_CONFIG, SOROBAN_RPC_URL } from './contractConfig'

// Wallet types
const WALLET_TYPES = {
  FREIGHTER: 'freighter',
  XBULL: 'xbull',
  ALBEDO: 'albedo'
}

function App() {
  // Wallet type state
  const [walletType, setWalletType] = useState(null)
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [publicKey, setPublicKey] = useState('')
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [freighterInstalled, setFreighterInstalled] = useState(true)
  
  // Transaction form state
  const [destinationAddress, setDestinationAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [txLoading, setTxLoading] = useState(false)
  const [txStatus, setTxStatus] = useState(null)
  const [txHash, setTxHash] = useState('')

  // Initialize Stellar SDK for Testnet
  const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org')
  const networkPassphrase = StellarSdk.Networks.TESTNET

  // Check if Freighter is installed
  useEffect(() => {
    const checkFreighter = async () => {
      try {
        const installed = await isConnected()
        setFreighterInstalled(true)
      } catch (err) {
        setFreighterInstalled(false)
      }
    }
    checkFreighter()
  }, [])

  // Connect wallet
  const handleConnectWallet = async () => {
    setLoading(true)
    setError('')
    
    try {
      const publicKey = await getPublicKey()
      setPublicKey(publicKey)
      setWalletConnected(true)
      
      // Fetch balance after connection
      await fetchBalance(publicKey)
    } catch (err) {
      setError(`Failed to connect wallet: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Disconnect wallet
  const handleDisconnectWallet = () => {
    setWalletConnected(false)
    setPublicKey('')
    setBalance(null)
    setError('')
    setTxStatus(null)
    setTxHash('')
  }

  // Fetch XLM balance
  const fetchBalance = async (pubKey) => {
    setLoading(true)
    setError('')
    
    try {
      const account = await server.loadAccount(pubKey)
      
      // Find XLM balance (native asset)
      const xlmBalance = account.balances.find(
        (balance) => balance.asset_type === 'native'
      )
      
      if (xlmBalance) {
        setBalance(parseFloat(xlmBalance.balance))
      } else {
        setBalance(0)
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Account not funded. Please fund your testnet account at https://laboratory.stellar.org/#account-creator')
        setBalance(0)
      } else {
        setError(`Failed to fetch balance: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  // Refresh balance
  const handleRefreshBalance = () => {
    if (publicKey) {
      fetchBalance(publicKey)
    }
  }

  // Send XLM transaction
  const handleSendTransaction = async (e) => {
    e.preventDefault()
    setTxLoading(true)
    setTxStatus(null)
    setTxHash('')
    setError('')

    try {
      // Validate inputs
      if (!destinationAddress || !amount) {
        throw new Error('Please fill in all fields')
      }

      if (!StellarSdk.StrKey.isValidEd25519PublicKey(destinationAddress)) {
        throw new Error('Invalid destination address')
      }

      const amountNum = parseFloat(amount)
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Invalid amount')
      }

      if (amountNum > balance) {
        throw new Error('Insufficient balance')
      }

      // Load source account
      const sourceAccount = await server.loadAccount(publicKey)

      // Build transaction
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: networkPassphrase,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationAddress,
            asset: StellarSdk.Asset.native(),
            amount: amount.toString(),
          })
        )
        .setTimeout(180)
        .build()

      // Sign transaction with Freighter
      const signedTransaction = await signTransaction(
        transaction.toXDR(),
        {
          network: 'TESTNET',
          networkPassphrase: networkPassphrase,
        }
      )

      // Submit transaction
      const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(
        signedTransaction,
        networkPassphrase
      )

      const result = await server.submitTransaction(transactionToSubmit)

      // Success
      setTxStatus('success')
      setTxHash(result.hash)
      setDestinationAddress('')
      setAmount('')

      // Refresh balance
      setTimeout(() => {
        fetchBalance(publicKey)
      }, 2000)

    } catch (err) {
      setTxStatus('error')
      setError(`Transaction failed: ${err.message}`)
    } finally {
      setTxLoading(false)
    }
  }

  if (!freighterInstalled) {
    return (
      <div className="app">
        <div className="header">
          <h1>🌟 Stellar Wallet Checker</h1>
          <p>Manage your Stellar testnet wallet</p>
        </div>
        <div className="install-freighter">
          <h3>Freighter Wallet Not Detected</h3>
          <p>
            Please install the Freighter wallet extension to use this application.
          </p>
          <p>
            <a 
              href="https://www.freighter.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Download Freighter Wallet
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="header">
        <h1>🌟 Stellar Wallet Checker</h1>
        <p>Manage your Stellar testnet wallet</p>
      </div>

      {/* Wallet Connection */}
      <div className="wallet-connection">
        {!walletConnected ? (
          <button 
            className="btn btn-primary" 
            onClick={handleConnectWallet}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading"></span>
                Connecting...
              </>
            ) : (
              'Connect Freighter Wallet'
            )}
          </button>
        ) : (
          <button 
            className="btn btn-danger" 
            onClick={handleDisconnectWallet}
          >
            Disconnect Wallet
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Connected Wallet Info */}
      {walletConnected && (
        <>
          <div className="connected-info">
            <h3>Connected Account</h3>
            <div className="public-key">{publicKey}</div>
          </div>

          {/* Balance Section */}
          <div className="balance-section">
            <div className="balance-card">
              <h2>Your Balance</h2>
              {loading && balance === null ? (
                <div className="loading"></div>
              ) : (
                <>
                  <div className="balance-amount">
                    {balance !== null ? balance.toFixed(7) : '0.0000000'}
                  </div>
                  <div className="balance-currency">XLM</div>
                </>
              )}
            </div>
            <button 
              className="btn btn-primary" 
              onClick={handleRefreshBalance}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh Balance'}
            </button>
          </div>

          {/* Transaction Section */}
          <div className="transaction-section">
            <h3>Send XLM Transaction</h3>

            {txStatus === 'success' && (
              <div className="alert alert-success">
                <strong>✅ Transaction Successful!</strong>
                <div className="transaction-hash">
                  <strong>Transaction Hash:</strong><br />
                  {txHash}
                  <br />
                  <a 
                    href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#155724', marginTop: '10px', display: 'inline-block' }}
                  >
                    View on Stellar Expert →
                  </a>
                </div>
              </div>
            )}

            {txStatus === 'error' && (
              <div className="alert alert-error">
                <strong>❌ Transaction Failed</strong>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSendTransaction}>
              <div className="form-group">
                <label>Destination Address</label>
                <input
                  type="text"
                  placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                  disabled={txLoading}
                />
              </div>

              <div className="form-group">
                <label>Amount (XLM)</label>
                <input
                  type="number"
                  step="0.0000001"
                  min="0.0000001"
                  placeholder="10.5"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={txLoading}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={txLoading || !destinationAddress || !amount}
              >
                {txLoading ? (
                  <>
                    <span className="loading"></span>
                    Sending Transaction...
                  </>
                ) : (
                  'Send XLM'
                )}
              </button>
            </form>
          </div>

          {/* Testnet Info */}
          <div className="alert alert-info">
            <strong>ℹ️ Testnet Information</strong>
            <p>
              This application uses the Stellar Testnet. To fund your account, visit:{' '}
              <a 
                href="https://laboratory.stellar.org/#account-creator?network=test"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0c5460', fontWeight: 'bold' }}
              >
                Stellar Laboratory Account Creator
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default App
