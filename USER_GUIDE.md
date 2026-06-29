# 📖 User Guide - Stellar Multi-Wallet Application

**Welcome to the Stellar Multi-Wallet Application!**

This guide will help you get started with connecting your wallet, sending transactions, interacting with smart contracts, and providing feedback.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:

1. **Freighter Wallet** installed
   - Download from: [https://www.freighter.app/](https://www.freighter.app/)
   - Install the browser extension
   - Create or import a wallet

2. **Testnet XLM** in your wallet
   - Switch Freighter to **TESTNET** mode
   - Get free testnet XLM from: [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)

3. **Modern Web Browser**
   - Chrome, Firefox, Edge, or Brave
   - JavaScript enabled

---

## 📱 Step-by-Step Tutorial

### Step 1: Connect Your Wallet

1. **Visit the Application**
   - Go to: [https://stellar-wallet-checker.vercel.app/](https://stellar-wallet-checker.vercel.app/)

2. **Click "Connect Wallet"**
   - You'll see wallet options: Freighter and xBull
   - Currently, only Freighter is fully supported

3. **Select Freighter**
   - Click on the Freighter wallet card
   - A Freighter popup will appear

4. **Approve Connection**
   - Review the connection request
   - Click "Approve" in Freighter
   - Your wallet is now connected!

**What You'll See:**
- Your public key displayed
- Your XLM balance
- Connected wallet badge (🚀 Freighter)

---

### Step 2: Check Your Balance

1. **View Balance**
   - Your current XLM balance is displayed prominently
   - Shows up to 7 decimal places

2. **Refresh Balance**
   - Click "Refresh Balance" to update
   - Useful after transactions

**Troubleshooting:**
- **"Account not funded"** - Get testnet XLM from Stellar Laboratory
- **Balance not updating** - Click Refresh Balance button

---

### Step 3: Interact with Smart Contract

**What is the Smart Contract?**
- Deployed Soroban counter contract
- Written in Rust
- Lives on Stellar Testnet
- Increments a counter when called

**How to Use:**

1. **Find the Contract Section**
   - Scroll to "📜 Soroban Smart Contract Interaction"

2. **View Contract Info**
   - Contract ID is displayed
   - Shows current counter value
   - Indicates contract type and source code location

3. **Call the Contract**
   - Click "➕ Call increment() Function"
   - Freighter popup appears
   - Review the transaction
   - Click "Approve" to sign

4. **Wait for Confirmation**
   - Transaction submits to Stellar Testnet
   - Counter increments by 1
   - Success message appears with transaction hash

5. **View on Explorer**
   - Click the Stellar Expert link
   - See your transaction on the blockchain!

**What This Does:**
- ✅ Calls the deployed Soroban smart contract
- ✅ Increments the counter stored in the contract
- ✅ Proves contract integration works
- ✅ Creates a verifiable transaction on testnet

---

### Step 4: Send XLM Payment

**How to Send XLM:**

1. **Scroll to "💸 Send XLM Transaction"**

2. **Enter Destination Address**
   - Paste a valid Stellar address
   - Format: `GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   - Must start with 'G'

3. **Enter Amount**
   - Type the amount of XLM to send
   - Example: `10.5`
   - Must have sufficient balance

4. **Click "Send XLM"**
   - Freighter popup appears
   - Review the transaction details
   - Click "Approve" to sign

5. **Transaction Confirms**
   - Success message appears
   - Transaction hash displayed
   - Balance updates automatically

6. **View on Explorer**
   - Click the Stellar Expert link
   - Verify your transaction

**Tips:**
- ✅ Always double-check destination address
- ✅ Leave some XLM for future transaction fees
- ✅ Test with small amounts first

---

### Step 5: Monitor Real-time Events

**What is the Event Log?**
- Shows all your actions in real-time
- Color-coded by type:
  - 🟢 Green = Success
  - 🔴 Red = Error
  - 🔵 Blue = Info
- Includes timestamps

**What Events Are Logged:**
- Wallet connections
- Balance updates
- Transaction submissions
- Contract calls
- Errors
- Status updates

**How to Use:**
- Scroll to "📡 Real-time Event Log"
- Watch events appear as you interact
- Last 10 events are shown
- Most recent at the top

---

### Step 6: View Analytics

**What Are Analytics?**
- Track user interactions
- Monitor application usage
- View success rates
- See user feedback

**How to Access:**

1. **Click "📊 Analytics" Button**
   - Located under your wallet info
   - Shows total user count

2. **Explore Dashboard Tabs**

   **Overview Tab:**
   - Total users registered
   - Wallet connections count
   - Transactions sent
   - Contract calls made
   - Average user rating
   - Success rates
   - Error count

   **Users Tab:**
   - List of all registered users
   - Public keys (masked for privacy)
   - First/last seen dates
   - Interaction counts
   - User badges

   **Feedback Tab:**
   - User feedback submissions
   - Star ratings
   - Feedback text
   - Timestamps

3. **Export Data**
   - Click "📥 Export JSON" for complete data
   - Click "📥 Export CSV" for spreadsheet format
   - Use for proof of interactions

**Why Analytics Matter:**
- Shows real-world usage
- Proves application works
- Helps improve the app
- Required for Level 3 submission

---

### Step 7: Give Feedback

**Help Us Improve!**

1. **Click "📝 Give Feedback" Button**
   - Located under your wallet info

2. **Rate Your Experience**
   - Click stars (1-5)
   - 5 stars = Excellent
   - 1 star = Poor
   - Rating is required

3. **Share Your Thoughts**
   - General feedback (optional)
   - What worked well (optional)
   - What needs improvement (optional)
   - Feature suggestions (optional)

4. **Submit Feedback**
   - Click "Submit Feedback"
   - Success message appears
   - Your feedback is saved!

**Your Feedback Helps:**
- Improve user experience
- Prioritize features
- Fix bugs faster
- Make the app better for everyone

---

## 🎯 Common Use Cases

### Use Case 1: Test Contract Integration
**Goal:** Verify smart contract works

**Steps:**
1. Connect Freighter wallet
2. Click "Call increment() Function"
3. Approve in Freighter
4. Verify success message
5. Check transaction on Stellar Expert

**Expected Result:** Counter increments, transaction hash displayed

---

### Use Case 2: Send Test Payment
**Goal:** Send XLM to another address

**Steps:**
1. Connect wallet
2. Get a destination address
3. Enter address and amount
4. Click "Send XLM"
5. Approve in Freighter
6. Verify success

**Expected Result:** Transaction successful, balance updated

---

### Use Case 3: Contribute to User Analytics
**Goal:** Help reach 10+ user goal

**Steps:**
1. Connect your wallet
2. Perform 2-3 transactions
3. Call contract 2-3 times
4. Submit feedback
5. Share with friends!

**Impact:** Helps application meet Level 3 requirements

---

## 🆘 Troubleshooting

### Problem: Wallet Won't Connect

**Possible Causes:**
- Freighter not installed
- Freighter locked
- Wrong network

**Solutions:**
1. Install Freighter from [freighter.app](https://www.freighter.app/)
2. Unlock Freighter extension
3. Switch Freighter to TESTNET mode

---

### Problem: Account Not Funded

**Error Message:** "Account not funded"

**Solution:**
1. Go to [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)
2. Paste your public key
3. Click "Get test network lumens"
4. Wait 5 seconds
5. Refresh balance in app

---

### Problem: Transaction Failed

**Possible Causes:**
- Insufficient balance
- Invalid destination address
- Network issues

**Solutions:**
1. Check balance is sufficient
2. Verify destination address format
3. Ensure you have testnet XLM
4. Try again in a few moments

---

### Problem: Contract Call Failed

**Possible Causes:**
- Network congestion
- Insufficient XLM for fees
- Wallet not supporting Soroban

**Solutions:**
1. Ensure you have 1+ XLM for fees
2. Try again in a few seconds
3. Check event log for error details

---

### Problem: Analytics Not Showing

**Possible Causes:**
- Browser privacy mode
- LocalStorage disabled

**Solutions:**
1. Disable privacy/incognito mode
2. Allow localStorage in browser settings
3. Refresh page
4. Try different browser

---

## 💡 Tips & Best Practices

### Security Tips
- ✅ Always verify destination addresses
- ✅ Start with small test amounts
- ✅ Never share your secret key
- ✅ Use testnet XLM (no real value)
- ✅ Review transactions before approving

### Usage Tips
- ✅ Keep some XLM for transaction fees
- ✅ Wait for confirmations before next action
- ✅ Check event log for status updates
- ✅ Refresh balance after transactions
- ✅ Export analytics data before clearing browser

### Feedback Tips
- ✅ Be specific in your feedback
- ✅ Mention what you like
- ✅ Suggest improvements
- ✅ Report any bugs you find

---

## 🌟 Features Overview

### ✅ Multi-Wallet Support
- Freighter wallet (fully supported)
- xBull wallet (coming soon)
- Wallet selection screen
- Connection status indicator

### ✅ Balance Management
- Real-time XLM balance display
- 7 decimal precision
- Manual refresh button
- Auto-refresh after transactions

### ✅ Smart Contract Integration
- Deployed Soroban counter contract
- Increment function callable from UI
- Transaction verification
- Contract ID displayed
- Source code references

### ✅ Transaction Features
- Send XLM payments
- Address validation
- Amount validation
- Balance checking
- Success/error feedback
- Transaction hash with explorer link

### ✅ Real-time Events
- Live event log
- Color-coded events
- Timestamps
- Last 10 events displayed
- Auto-scrolling

### ✅ Analytics & Monitoring
- User tracking
- Event tracking
- Success rate metrics
- Feedback collection
- Data export (JSON/CSV)

### ✅ Mobile Responsive
- Works on all screen sizes
- Touch-friendly buttons
- Optimized layouts
- Tested on 5+ breakpoints

---

## 📚 Additional Resources

### Documentation
- **Main README:** Complete project overview
- **Analytics Documentation:** `ANALYTICS.md`
- **Contract Documentation:** `contracts/README.md`
- **Deployment Guide:** `DEPLOYMENT_GUIDE.md`

### External Links
- **Stellar Docs:** [https://developers.stellar.org/](https://developers.stellar.org/)
- **Soroban Docs:** [https://soroban.stellar.org/](https://soroban.stellar.org/)
- **Freighter Wallet:** [https://www.freighter.app/](https://www.freighter.app/)
- **Stellar Laboratory:** [https://laboratory.stellar.org/](https://laboratory.stellar.org/)
- **Stellar Expert:** [https://stellar.expert/](https://stellar.expert/)

### Support
- **GitHub Issues:** [Report bugs or request features](https://github.com/frankosakwe/stellar-wallet-checker/issues)
- **GitHub Discussions:** [Ask questions or share ideas](https://github.com/frankosakwe/stellar-wallet-checker/discussions)

---

## 🎓 What You've Learned

After following this guide, you now know how to:

- ✅ Connect a Stellar wallet to a dApp
- ✅ Check your XLM balance
- ✅ Interact with a Soroban smart contract
- ✅ Send XLM transactions
- ✅ Monitor real-time events
- ✅ View application analytics
- ✅ Submit user feedback
- ✅ Export interaction data
- ✅ Troubleshoot common issues

---

## 🚀 Next Steps

1. **Explore More:**
   - Try different amounts
   - Call contract multiple times
   - Check analytics dashboard

2. **Share:**
   - Tell friends about the app
   - Share on social media
   - Help reach 10+ users goal

3. **Contribute:**
   - Submit feedback
   - Report bugs
   - Suggest features

4. **Learn:**
   - Read Stellar documentation
   - Explore Soroban contracts
   - Check out the source code

---

## ❓ FAQ

**Q: Is this a real blockchain application?**  
A: Yes! It's deployed on Stellar Testnet, a real test network.

**Q: Does testnet XLM have value?**  
A: No, testnet XLM has no real-world value. It's for testing only.

**Q: Can I use this on mainnet?**  
A: Not yet. This is a testnet application for educational purposes.

**Q: How do I get more testnet XLM?**  
A: Visit Stellar Laboratory and use the account creator tool.

**Q: Is my data safe?**  
A: Yes! All analytics data stays in your browser. Nothing is sent to external servers.

**Q: Can I delete my analytics data?**  
A: Yes. Clear your browser's localStorage to remove all data.

**Q: Why do I need Freighter?**  
A: Freighter is a Stellar wallet that safely stores your keys and signs transactions.

**Q: What if I find a bug?**  
A: Please submit feedback through the app or report it on GitHub!

---

**Thank you for using the Stellar Multi-Wallet Application!**

We appreciate your time and feedback. Your interactions help us build better decentralized applications for the Stellar ecosystem.

---

**Version:** 1.0.0  
**Last Updated:** June 29, 2026  
**App URL:** https://stellar-wallet-checker.vercel.app/  
**GitHub:** https://github.com/frankosakwe/stellar-wallet-checker

---

*Built with ❤️ for the Stellar community*
