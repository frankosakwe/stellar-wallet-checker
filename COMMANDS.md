# 💻 Useful Commands

Quick reference for all commands you'll need.

---

## 📦 Installation Commands

### Install Dependencies
```bash
npm install
```

### Install Specific Package (if needed)
```bash
npm install <package-name>
```

---

## 🚀 Development Commands

### Start Development Server
```bash
npm run dev
```
Opens at: http://localhost:3000

### Build for Production
```bash
npm run build
```
Output folder: `dist/`

### Preview Production Build
```bash
npm run preview
```

---

## 🐙 Git Commands

### Initialize Repository
```bash
git init
```

### Check Status
```bash
git status
```

### Stage All Files
```bash
git add .
```

### Stage Specific File
```bash
git add filename.txt
```

### Commit Changes
```bash
git commit -m "Your commit message"
```

### View Commit History
```bash
git log --oneline
```

### Create New Branch
```bash
git branch branch-name
```

### Switch Branch
```bash
git checkout branch-name
```

### Add Remote Repository
```bash
git remote add origin https://github.com/YOUR-USERNAME/stellar-wallet-checker.git
```

### Verify Remote
```bash
git remote -v
```

### Push to GitHub (First Time)
```bash
git branch -M main
git push -u origin main
```

### Push Updates
```bash
git push
```

### Pull Latest Changes
```bash
git pull
```

### Clone Repository
```bash
git clone https://github.com/YOUR-USERNAME/stellar-wallet-checker.git
```

---

## 📁 File Management Commands

### Create Directory (Windows CMD)
```cmd
mkdir folder-name
```

### Create Directory (PowerShell/Mac/Linux)
```bash
mkdir folder-name
```

### List Files (Windows CMD)
```cmd
dir
```

### List Files (PowerShell/Mac/Linux)
```bash
ls
```

### Change Directory
```bash
cd folder-name
```

### Go Up One Directory
```bash
cd ..
```

### Go to Project Root
```bash
cd stellar-wallet-checker
```

---

## 🔍 Debugging Commands

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Check Git Version
```bash
git --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Delete node_modules and Reinstall
```bash
# Windows CMD
rmdir /s /q node_modules
npm install

# PowerShell/Mac/Linux
rm -rf node_modules
npm install
```

---

## 🌐 Browser Commands

### Open Browser Console
- **Windows/Linux**: `F12` or `Ctrl + Shift + I`
- **Mac**: `Cmd + Option + I`

### Reload Page
- **Windows/Linux**: `Ctrl + R` or `F5`
- **Mac**: `Cmd + R`

### Hard Reload (Clear Cache)
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

---

## 📸 Screenshot Commands

### Windows Snipping Tool
```bash
# Press Windows Key, then type:
snipping tool
```

### Windows Screenshot Shortcut
```
Windows + Shift + S
```

### Mac Screenshot
```
Cmd + Shift + 4
```

---

## 🔧 Project-Specific Commands

### Full Setup from Scratch
```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/stellar-wallet-checker.git

# Navigate to folder
cd stellar-wallet-checker

# Install dependencies
npm install

# Run application
npm run dev
```

### Clean Build
```bash
# Delete build folder
rm -rf dist

# Create new build
npm run build
```

### Update README with Your Username
```bash
# Open in text editor and find/replace
YOUR-USERNAME → your-actual-username
```

---

## 📋 Git Workflow for Updates

### After Making Changes
```bash
# 1. Check what changed
git status

# 2. Stage changes
git add .

# 3. Commit changes
git commit -m "Description of changes"

# 4. Push to GitHub
git push
```

---

## 🐛 Troubleshooting Commands

### If Application Won't Start
```bash
# Delete node_modules
rm -rf node_modules

# Delete package-lock.json
rm package-lock.json

# Reinstall
npm install

# Try running again
npm run dev
```

### If Port 3000 is Busy
```bash
# Change port in vite.config.js, or
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill
```

### If Git Push Fails
```bash
# Pull first, then push
git pull origin main
git push origin main
```

---

## 📚 Documentation Commands

### View File Contents (Windows CMD)
```cmd
type filename.txt
```

### View File Contents (PowerShell/Mac/Linux)
```bash
cat filename.txt
```

### Open in Default Editor (Windows)
```cmd
notepad filename.txt
```

### Open in VS Code
```bash
code .
```

---

## 🌟 Quick Commands Cheatsheet

| Task | Command |
|------|---------|
| Install | `npm install` |
| Run | `npm run dev` |
| Build | `npm run build` |
| Git Init | `git init` |
| Git Add | `git add .` |
| Git Commit | `git commit -m "message"` |
| Git Push | `git push` |
| Check Node | `node --version` |
| Clean Install | `rm -rf node_modules && npm install` |

---

## 🔗 Useful URLs

- **Local App**: http://localhost:3000
- **Freighter**: https://www.freighter.app/
- **Stellar Lab**: https://laboratory.stellar.org/#account-creator?network=test
- **Stellar Expert**: https://stellar.expert/explorer/testnet
- **GitHub**: https://github.com
- **Node.js**: https://nodejs.org
- **Git**: https://git-scm.com

---

## 📞 Command Help

### Get Help for npm
```bash
npm help
```

### Get Help for Git
```bash
git --help
```

### Get Help for Specific Git Command
```bash
git help <command>
# Example: git help commit
```

---

**Tip**: Save this file for quick reference! You can also print it out or keep it open in another window.
