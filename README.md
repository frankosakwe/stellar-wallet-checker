# 🌟 Stellar Wallet Balance Checker

A modern React web application for managing Stellar testnet wallets with Freighter wallet integration. Check your XLM balance and send transactions on the Stellar testnet with a beautiful, user-friendly interface.

## 📝 Project Description

This application provides a complete wallet management solution for the Stellar blockchain testnet. Users can connect their Freighter wallet, view their XLM balance in real-time, and send testnet transactions with full feedback on transaction status. The application features comprehensive error handling, input validation, and a clean, responsive UI design.

**Built with:**
- React 18 (with Hooks)
- Stellar SDK v11
- Freighter API v2
- Vite (for fast development)
- Stellar Testnet

## Features

### 1. Wallet Setup
- Integration with Freighter wallet (Stellar's browser extension wallet)
- Configured for Stellar Testnet
- Automatic detection of Freighter installation

### 2. Wallet Connection
- **Connect Wallet**: One-click connection to Freighter wallet
- **Disconnect Wallet**: Clean disconnection with state reset
- Displays connected public key

### 3. Balance Handling
- Fetches and displays XLM balance from connected wallet
- Real-time balance updates
- Refresh balance functionality
- Clear balance display in the UI with 7 decimal precision

### 4. Transaction Flow
- Send XLM transactions on Stellar testnet
- Input validation for destination address and amount
- Transaction feedback:
  - ✅ Success state with transaction hash
  - ❌ Failure state with error message
  - Transaction confirmation with link to Stellar Expert
- Loading states during transaction processing
- Automatic balance refresh after successful transaction

### 5. Development Standards
- Clean UI with gradient design
- Responsive layout
- Error handling for all operations
- Loading indicators for async operations
- Form validation
- Testnet information and funding links

## 🚀 Setup Instructions

### Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **Git** - [Download here](https://git-scm.com/)
3. **Freighter Wallet Extension** - [Install from freighter.app](https://www.freighter.app/)

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/frankosakwe/stellar-wallet-checker.git
cd stellar-wallet-checker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically reload if you make changes

### First-Time Setup

1. **Install Freighter Wallet**: 
   - Visit [freighter.app](https://www.freighter.app/)
   - Install the browser extension
   - Create a new wallet or import an existing one

2. **Switch to Testnet**:
   - Open Freighter extension
   - Click settings (gear icon)
   - Select "TESTNET" as the network

3. **Fund Your Testnet Account**:
   - Visit [Stellar Laboratory Account Creator](https://laboratory.stellar.org/#account-creator?network=test)
   - Paste your Freighter public key
   - Click "Get test network lumens"
   - Your account will be funded with 10,000 test XLM

## 📸 Screenshots

### 1. Wallet Connected State
![Wallet Connected](./screenshots/wallet-connected.png)
*The application after successfully connecting the Freighter wallet, showing the connected public key*

### 2. Balance Displayed
![Balance Display](./screenshots/balance-display.png)
*XLM balance displayed with 7 decimal precision, showing the current testnet balance*

### 3. Successful Testnet Transaction
![Transaction Success](./screenshots/transaction-success.png)
*Successful transaction confirmation with transaction hash and link to Stellar Expert*

### 4. Transaction Result Display
![Transaction Result](./screenshots/transaction-result.png)
*Complete transaction feedback shown to the user including hash and confirmation message*

## 🎯 How to Use

1. **Install Freighter**: If not already installed, the app will prompt you to install the Freighter wallet extension

2. **Connect Wallet**: Click "Connect Freighter Wallet" and approve the connection in Freighter

3. **Fund Account** (if needed): If your account shows 0 balance and an error, visit the Stellar Laboratory to fund your testnet account

4. **Check Balance**: Your XLM balance will be displayed automatically. Use "Refresh Balance" to update it

5. **Send Transaction**:
   - Enter the destination Stellar address
   - Enter the amount of XLM to send
   - Click "Send XLM"
   - Approve the transaction in Freighter
   - View transaction confirmation with hash

## Project Structure

```
stellar-wallet-checker/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Application styles
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## Key Dependencies

- **React**: UI framework
- **Vite**: Build tool and dev server
- **@stellar/freighter-api**: Freighter wallet integration
- **stellar-sdk**: Stellar blockchain interaction

## Error Handling

The application handles:
- Freighter not installed
- Wallet connection failures
- Account not funded
- Invalid transaction inputs
- Network errors
- Transaction failures

## Testnet Resources

- **Fund Account**: https://laboratory.stellar.org/#account-creator?network=test
- **Stellar Expert**: https://stellar.expert/explorer/testnet
- **Horizon Testnet**: https://horizon-testnet.stellar.org

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development Notes

- Uses Stellar Testnet (not mainnet)
- All transactions are free on testnet
- Testnet XLM has no real-world value
- Network passphrase: `Test SDF Network ; September 2015`

## Troubleshooting

**Freighter not detected**: Refresh the page after installing Freighter

**Account not funded**: Visit the Stellar Laboratory link to fund your testnet account

**Transaction failed**: Check that you have sufficient balance and the destination address is valid

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🔗 Useful Links

- [Stellar Documentation](https://developers.stellar.org/)
- [Freighter Wallet](https://www.freighter.app/)
- [Stellar Laboratory](https://laboratory.stellar.org/)
- [Stellar Expert (Testnet Explorer)](https://stellar.expert/explorer/testnet)
- [Stellar Testnet Horizon API](https://horizon-testnet.stellar.org/)

## 👨‍💻 Author

Created as a submission for the Stellar wallet integration challenge.

---

**Note**: This application uses the Stellar **Testnet**. All transactions are performed with test XLM which has no real-world value. Never use testnet credentials or keys on the mainnet.
