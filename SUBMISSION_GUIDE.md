# 📋 Submission Guide

This guide will help you prepare your project for submission, including taking screenshots and setting up the GitHub repository.

## 📸 Step 1: Take Screenshots

### Before Taking Screenshots:
1. Make sure the application is running (`npm run dev`)
2. Have Freighter wallet installed and configured for Testnet
3. Have your testnet account funded (at least 100 XLM for testing)

### Screenshot 1: Wallet Connected State
**What to capture:** The app after connecting Freighter wallet

**Steps:**
1. Open the application at `http://localhost:3000`
2. Click "Connect Freighter Wallet"
3. Approve the connection in Freighter popup
4. Take a screenshot showing:
   - The "Disconnect Wallet" button
   - Your connected public key displayed
   - The balance card visible
5. Save as `screenshots/wallet-connected.png`

### Screenshot 2: Balance Displayed
**What to capture:** Your XLM balance clearly shown

**Steps:**
1. With wallet connected, ensure your balance is loaded
2. Take a screenshot showing:
   - The balance card with your XLM amount
   - The "Refresh Balance" button
   - Clear display of the balance (e.g., "10000.0000000 XLM")
3. Save as `screenshots/balance-display.png`

### Screenshot 3: Successful Testnet Transaction
**What to capture:** Transaction success message

**Steps:**
1. Scroll down to the "Send XLM Transaction" section
2. Enter a destination address (you can use your own address or another test account)
3. Enter an amount (e.g., 10 XLM)
4. Click "Send XLM"
5. Approve the transaction in Freighter
6. Wait for confirmation
7. Take a screenshot showing:
   - The green success message "✅ Transaction Successful!"
   - The transaction hash displayed
   - The "View on Stellar Expert" link
8. Save as `screenshots/transaction-success.png`

### Screenshot 4: Transaction Result Display
**What to capture:** Complete transaction feedback

**Steps:**
1. Same as Screenshot 3, but ensure you capture:
   - The full transaction hash
   - The success message
   - The updated balance (if visible in the screenshot)
2. Save as `screenshots/transaction-result.png`

### Creating Screenshots Folder:
```bash
mkdir screenshots
```
Then place your screenshot files in this folder.

## 🐙 Step 2: Set Up GitHub Repository

### Create a New Repository on GitHub

1. **Go to GitHub**:
   - Visit [github.com](https://github.com)
   - Click the "+" icon in the top right
   - Select "New repository"

2. **Configure Repository**:
   - Repository name: `stellar-wallet-checker`
   - Description: "A Stellar testnet wallet manager with Freighter integration"
   - Visibility: Public ✅
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

### Push Your Project to GitHub

Open your terminal in the project directory and run:

```bash
# Navigate to project directory
cd stellar-wallet-checker

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Stellar Wallet Balance Checker"

# Add remote repository (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/stellar-wallet-checker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Verify Your Repository

1. Refresh your GitHub repository page
2. Ensure all files are uploaded:
   - ✅ src/ folder with App.jsx, main.jsx, index.css
   - ✅ screenshots/ folder with all 4 images
   - ✅ README.md
   - ✅ package.json
   - ✅ vite.config.js
   - ✅ index.html

## ✅ Step 3: Final Checklist

Before submitting, verify:

### Repository Checklist:
- [ ] Repository is public on GitHub
- [ ] README.md includes project description
- [ ] README.md includes setup instructions
- [ ] README.md includes all 4 screenshots
- [ ] Screenshots folder exists with all images
- [ ] All source code is committed and pushed
- [ ] Repository URL is accessible

### Functionality Checklist:
- [ ] Application runs without errors (`npm run dev`)
- [ ] Wallet connects successfully with Freighter
- [ ] Balance displays correctly
- [ ] Transaction can be sent successfully
- [ ] Transaction result is shown to user
- [ ] Error handling works properly

### README Checklist:
- [ ] Project description is clear and concise
- [ ] Setup instructions are complete and easy to follow
- [ ] Prerequisites are listed
- [ ] Installation steps are numbered
- [ ] Screenshots are embedded and visible
- [ ] Links to resources are working

## 📝 Step 4: Update README with Your GitHub Username

In the README.md file, replace this line:
```bash
git clone https://github.com/YOUR-USERNAME/stellar-wallet-checker.git
```

With your actual GitHub username:
```bash
git clone https://github.com/yourusername/stellar-wallet-checker.git
```

Then commit and push:
```bash
git add README.md
git commit -m "Update README with correct repository URL"
git push
```

## 🎉 Step 5: Submit

Your submission is ready! Provide the GitHub repository URL:
```
https://github.com/YOUR-USERNAME/stellar-wallet-checker
```

## 💡 Tips for Taking Good Screenshots

1. **Use Full Window**: Capture the full browser window for context
2. **Clear UI**: Make sure no overlapping windows or notifications
3. **Good Lighting**: If needed, use browser zoom for clarity
4. **Relevant Content**: Ensure the key elements are visible and clear
5. **File Format**: PNG format is preferred for clarity
6. **File Size**: Optimize images if they're too large (use tools like TinyPNG)

## 🔧 Screenshot Tools

### Windows:
- **Snipping Tool**: Built-in (Search for "Snipping Tool")
- **Windows + Shift + S**: Quick screenshot shortcut
- **Print Screen**: Full screen capture

### Mac:
- **Cmd + Shift + 4**: Select area to capture
- **Cmd + Shift + 3**: Full screen capture

### Browser Extensions:
- **FireShot**: Full page screenshots
- **Awesome Screenshot**: Advanced screenshot features

## 📱 Alternative: Use Online Screenshot Services

If you prefer, you can deploy the app and use online screenshot services:
1. Deploy to Vercel/Netlify (free)
2. Use screenshot.guru or similar
3. Download and add to screenshots folder

## ❓ Need Help?

If you encounter any issues:
1. Check that Node.js is installed: `node --version`
2. Check that Git is installed: `git --version`
3. Ensure Freighter is installed and on Testnet
4. Verify your testnet account is funded
5. Check browser console for errors (F12)

---

Good luck with your submission! 🚀
