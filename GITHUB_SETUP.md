# 🐙 Quick GitHub Setup Guide

Follow these steps to push your project to GitHub for submission.

## Option 1: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Install and sign in** to your GitHub account
3. Click **"File"** → **"Add Local Repository"**
4. Select the `stellar-wallet-checker` folder
5. Click **"Publish repository"**
6. Make sure **"Public"** is selected
7. Click **"Publish Repository"**
8. Done! Your repository is now on GitHub

## Option 2: Using Command Line

### First-Time Git Setup (if needed):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Push to GitHub:
```bash
# Navigate to project folder
cd stellar-wallet-checker

# Initialize repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Stellar Wallet Balance Checker with Freighter integration"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/stellar-wallet-checker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Option 3: Using VS Code (if you have it)

1. Open the `stellar-wallet-checker` folder in VS Code
2. Click the **Source Control** icon (left sidebar)
3. Click **"Initialize Repository"**
4. Stage all changes (+ icon next to "Changes")
5. Write commit message: "Initial commit"
6. Click the ✓ checkmark to commit
7. Click **"Publish Branch"**
8. Sign in to GitHub when prompted
9. Select **"Public"** repository
10. Done!

## Creating the Repository on GitHub (Manual Method)

If using command line, create the repository first:

1. Go to https://github.com/new
2. **Repository name**: `stellar-wallet-checker`
3. **Description**: "Stellar testnet wallet manager with Freighter integration"
4. Select **Public** ✅
5. **DO NOT** check "Add a README file" (we already have one)
6. Click **"Create repository"**
7. Copy the repository URL
8. Use the command line steps above with your URL

## Verifying Your Upload

After pushing, verify these files are on GitHub:

```
✅ README.md (with screenshots section)
✅ SUBMISSION_GUIDE.md
✅ GITHUB_SETUP.md
✅ package.json
✅ vite.config.js
✅ index.html
✅ .gitignore
✅ src/
   ✅ App.jsx
   ✅ main.jsx
   ✅ index.css
✅ screenshots/
   ✅ wallet-connected.png
   ✅ balance-display.png
   ✅ transaction-success.png
   ✅ transaction-result.png
```

## Common Issues

### "Permission denied" error:
- Use GitHub Desktop instead, or
- Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### "Repository already exists":
- The repository name is taken
- Choose a different name like `stellar-wallet-checker-app`
- Update the README.md with the new name

### "Git not found":
- Download Git: https://git-scm.com/downloads
- Restart your terminal after installation

## Your Repository URL

After setup, your repository will be at:
```
https://github.com/YOUR-USERNAME/stellar-wallet-checker
```

**This is the URL you'll submit!** ✅

## Next Steps

1. ✅ Push code to GitHub
2. 📸 Add screenshots (see SUBMISSION_GUIDE.md)
3. 🔄 Commit and push screenshots
4. ✅ Verify everything looks good on GitHub
5. 🎉 Submit your repository URL!

---

Need help? Check the [GitHub Docs](https://docs.github.com/en/get-started/quickstart) or use GitHub Desktop for the easiest experience!
