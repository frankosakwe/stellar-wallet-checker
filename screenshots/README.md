# 📸 Screenshots Directory

This folder contains all required screenshots for the Advanced Level 2.3 submission.

## ✅ Required Screenshots (MUST HAVE)

### 1. Mobile Responsive UI (3 views)
- **desktop-view.png** - Full desktop view of the application
- **tablet-view.png** - Tablet view (768px width, use DevTools device mode)
- **mobile-view.png** - Mobile view (375px width, iPhone 12 Pro or similar)

### 2. CI/CD Pipeline
- **cicd-pipeline.png** - GitHub Actions workflow showing all tests passing with green checkmarks

### 3. Test Results
- **test-results.png** - Terminal output showing "32 passed" tests

## 🌟 Bonus Screenshots (Recommended)

- **wallet-selection.png** - Multi-wallet selection interface (Freighter + xBull)
- **wallet-connected.png** - Connected state with public key and balance displayed
- **contract-interaction.png** - Smart contract interface with counter
- **transaction-success.png** - Successful transaction with hash and explorer link
- **event-log.png** - Real-time event log showing multiple events

---

## 📋 How to Take Screenshots

**See detailed guide**: `📸_SCREENSHOT_GUIDE.md` in root directory

### Quick Steps:

#### Desktop/Tablet/Mobile Views:
1. Open https://stellar-wallet-checker.vercel.app/
2. For desktop: Take full window screenshot (Win + Shift + S)
3. For mobile/tablet: Press F12 → Ctrl+Shift+M → Select device → Capture screenshot

#### CI/CD Pipeline:
1. Go to https://github.com/frankosakwe/stellar-wallet-checker/actions
2. Click on latest successful workflow run
3. Screenshot the green passing pipeline

#### Test Results:
1. Open terminal in project directory
2. Run: `npm test`
3. Screenshot when output shows "32 passed (32)"

---

## 📏 Screenshot Specifications

- **Format**: PNG (preferred) or JPG
- **Resolution**: Minimum 1280x720 (HD quality)
- **File Size**: Keep under 2MB each for faster loading
- **Quality**: Clear, readable text and UI elements
- **Content**: Show complete interface, no cropped elements

---

## 🚀 Adding Your Screenshots

1. **Take all screenshots** following the guide
2. **Save to this folder** with exact filenames listed above
3. **Commit to git**:
   ```bash
   git add screenshots/
   git commit -m "docs: Add required screenshots for advanced submission"
   git push
   ```
4. Screenshots will automatically display in README_V2.md!

---

## ✅ Verification Checklist

Before submitting, verify you have:
- [ ] desktop-view.png
- [ ] tablet-view.png  
- [ ] mobile-view.png
- [ ] cicd-pipeline.png
- [ ] test-results.png
- [ ] All files under 2MB
- [ ] All files pushed to GitHub

---

## 📍 Current Status

**Live App**: https://stellar-wallet-checker.vercel.app/  
**CI/CD**: https://github.com/frankosakwe/stellar-wallet-checker/actions  
**Repository**: https://github.com/frankosakwe/stellar-wallet-checker

---

**Once you add screenshots, your submission will be 100% complete!** 🎉
