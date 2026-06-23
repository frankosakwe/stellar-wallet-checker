# 📸 Screenshot & Demo Video Guide

**Complete guide to capture all required screenshots and record your demo video**

---

## 🎯 What You Need

### Required Screenshots (3 types):
1. ✅ Mobile Responsive UI (3 views)
2. ✅ CI/CD Pipeline Running 
3. ✅ Test Output (showing 3+ passing tests)

### Required Video:
1. ✅ Demo video (1-2 minutes)

---

## 📱 Part 1: Mobile Responsive UI Screenshots

### Step 1: Open Your Live App

**URL**: https://stellar-wallet-checker.vercel.app/

### Step 2: Take Desktop Screenshot

1. Open the URL in your browser
2. Make sure window is full size
3. **Windows**: Press `Win + Shift + S` (Snipping Tool)
4. **Mac**: Press `Cmd + Shift + 4`
5. Capture the full page showing:
   - App title "Stellar Multi-Wallet App"
   - "Connect Wallet" button
   - Contract information
   - Event log

**Save as**: `screenshots/desktop-view.png`

### Step 3: Take Tablet Screenshot

1. Press **F12** to open DevTools
2. Press **Ctrl+Shift+M** (or click device icon)
3. Select **iPad** or **iPad Pro** from device dropdown
4. Take screenshot:
   - **Chrome**: Right-click → "Capture screenshot"
   - **Windows Snip**: `Win + Shift + S`

**Save as**: `screenshots/tablet-view.png`

### Step 4: Take Mobile Screenshot

1. Keep DevTools open
2. Select **iPhone 12 Pro** or **iPhone SE** from device dropdown
3. Scroll to show different sections
4. Take screenshot of:
   - Main interface
   - Wallet connection
   - Contract section

**Save as**: `screenshots/mobile-view.png`

### Bonus Screenshots (Optional but Impressive):

**Wallet Selection Screen**:
1. Click "Connect Wallet" button
2. Take screenshot showing Freighter and xBull options

**Save as**: `screenshots/wallet-selection.png`

**Connected State**:
1. Connect your Freighter wallet
2. Show balance and public key displayed

**Save as**: `screenshots/wallet-connected.png`

**Transaction Success**:
1. Send a test transaction
2. Capture the success message with transaction hash

**Save as**: `screenshots/transaction-success.png`

---

## 🔄 Part 2: CI/CD Pipeline Screenshot

### Step 1: Go to GitHub Actions

**URL**: https://github.com/frankosakwe/stellar-wallet-checker/actions

### Step 2: Find a Successful Run

1. Look for runs with ✅ green checkmark
2. Click on the most recent successful run
3. You should see:
   - "CI/CD Pipeline" workflow
   - All jobs passing (green)
   - Test results
   - Build successful

### Step 3: Take Screenshot

**Full Pipeline View**:
- Capture the entire workflow showing all jobs passing
- Include workflow name, commit message, and success status

**Save as**: `screenshots/cicd-pipeline.png`

**Detailed Test Results** (Optional):
- Click on "Run Tests" job
- Expand test output
- Show "32 passing tests"

**Save as**: `screenshots/cicd-tests-passing.png`

---

## ✅ Part 3: Test Output Screenshot

### Step 1: Run Tests Locally

Open your terminal in the project directory:

```bash
cd c:\Users\USER\OneDrive\Music\rise 1\stellar-wallet-checker
npm test
```

### Step 2: Wait for Tests to Complete

You should see output like:

```
✓ src/test/contractConfig.test.js  (8 tests) 5ms
✓ src/test/utils.test.js  (14 tests) 21ms  
✓ src/test/App.test.jsx  (10 tests) 491ms

Test Files  3 passed (3)
Tests  32 passed (32)
```

### Step 3: Take Screenshot

**Windows**:
- Press `Win + Shift + S`
- Select the terminal area
- Make sure "32 passed" is visible

**Save as**: `screenshots/test-results.png`

---

## 🎥 Part 4: Demo Video (1-2 minutes)

### Recording Tools:

**Option 1: Loom (Recommended - Easiest)**
1. Visit https://loom.com
2. Sign up for free
3. Click "New Video"
4. Select "Screen Only"
5. Choose your browser window
6. Click "Start Recording"

**Option 2: Windows Game Bar**
1. Press `Win + G`
2. Click record button (or `Win + Alt + R`)
3. Record your screen
4. Stop with `Win + Alt + R`
5. Find video in Videos/Captures folder

**Option 3: OBS Studio (Advanced)**
1. Download from https://obsproject.com
2. Add Display Capture source
3. Click "Start Recording"

### Demo Script (Follow This!):

#### **00:00-00:15** - Introduction (15 seconds)
```
"Hi! This is my Stellar Multi-Wallet Application built for Level 2.3.
It features multi-wallet support, smart contract integration, and 
real-time event tracking on Stellar Testnet."
```

**What to show**:
- Homepage loaded
- Point to key features

---

#### **00:15-00:35** - Wallet Connection (20 seconds)
```
"Let me show you how wallet connection works. 
I'll click Connect Wallet..."
[Click button]
"Here you can see Freighter and xBull wallet options."
[Click Freighter]
"And now I'm connected! You can see my public key and XLM balance."
```

**What to show**:
- Click "Connect Wallet"
- Show wallet selection
- Connect Freighter (approve in extension)
- Point to displayed balance

---

#### **00:35-01:05** - Smart Contract Interaction (30 seconds)
```
"Now let's interact with the deployed smart contract.
This is the contract address on Stellar Testnet."
[Point to contract address]
"I'll click Increment Counter to call the contract."
[Click button, approve transaction]
"Great! The transaction succeeded. Here's the transaction hash,
and I can view it on Stellar Expert."
[Click "View on Stellar Expert"]
```

**What to show**:
- Scroll to contract section
- Point to contract address
- Click "Increment Counter"
- Approve in Freighter
- Show transaction hash
- Click explorer link

---

#### **01:05-01:25** - Real-time Events (20 seconds)
```
"Down here is the real-time event log.
You can see all my actions logged with timestamps.
Let me send a quick transaction to show the live updates."
[Send small XLM transaction]
"See how it appears instantly in the event log!"
```

**What to show**:
- Scroll to event log
- Point to existing events
- Perform another action
- Show event appearing in real-time

---

#### **01:25-01:45** - Mobile Responsiveness (20 seconds)
```
"The app is fully mobile responsive. Let me show you."
[Open DevTools - F12]
[Toggle device toolbar - Ctrl+Shift+M]
[Select iPhone 12]
"Here it is on mobile - everything adapts perfectly.
Buttons are touch-optimized, text is readable,
and all features work smoothly."
[Scroll through app]
```

**What to show**:
- Open DevTools
- Toggle device mode
- Switch between devices
- Scroll and interact

---

#### **01:45-02:00** - Wrap Up (15 seconds)
```
"This app demonstrates advanced Stellar development with
32 passing tests, CI/CD pipeline, and comprehensive documentation.
Check out the repository on GitHub for full source code.
Thanks for watching!"
```

**What to show**:
- Return to desktop view
- Final look at homepage
- Maybe show GitHub repo briefly

---

### After Recording:

**Upload to YouTube**:
1. Go to https://youtube.com/upload
2. Upload your video
3. Title: "Stellar Multi-Wallet Application - Demo"
4. Set to "Unlisted" or "Public"
5. Copy the video link

**Or Use Loom**:
1. Loom automatically uploads
2. Copy the share link
3. Even easier!

**Add Link to README**:
```markdown
## 🎥 Demo Video

Watch the full demo: [https://www.loom.com/share/your-video-id]
```

---

## 📁 Organize Your Screenshots

Create this folder structure:

```
screenshots/
├── desktop-view.png          ✅ REQUIRED
├── tablet-view.png           ✅ REQUIRED  
├── mobile-view.png           ✅ REQUIRED
├── cicd-pipeline.png         ✅ REQUIRED
├── test-results.png          ✅ REQUIRED
├── wallet-selection.png      ⭐ BONUS
├── wallet-connected.png      ⭐ BONUS
└── transaction-success.png   ⭐ BONUS
```

---

## ⚡ Quick Action Checklist

- [ ] Take desktop screenshot
- [ ] Take tablet screenshot (DevTools)
- [ ] Take mobile screenshot (DevTools)
- [ ] Screenshot CI/CD pipeline on GitHub
- [ ] Run `npm test` and screenshot results
- [ ] Record 1-2 minute demo video
- [ ] Upload video to Loom/YouTube
- [ ] Save all files to `screenshots/` folder
- [ ] Update README with video link
- [ ] Commit and push everything

---

## 🚀 Commands to Run

### Create Screenshots Folder
```bash
cd c:\Users\USER\OneDrive\Music\rise 1\stellar-wallet-checker
mkdir screenshots
```

### Run Tests (for screenshot)
```bash
npm test
```

### Add Screenshots to Git
```bash
git add screenshots/
git commit -m "docs: Add required screenshots for submission"
git push
```

### Update README
```bash
# Edit README_V2.md to add:
# - Screenshot sections
# - Demo video link

git add README_V2.md
git commit -m "docs: Add demo video and screenshots to README"
git push
```

---

## ✅ Verification

Before submitting, make sure you have:

1. **5 Required Screenshots**:
   - ✅ Desktop view
   - ✅ Tablet view
   - ✅ Mobile view
   - ✅ CI/CD pipeline
   - ✅ Test results

2. **1 Demo Video**:
   - ✅ 1-2 minutes long
   - ✅ Shows all features
   - ✅ Uploaded with shareable link

3. **Updated README**:
   - ✅ Screenshots embedded
   - ✅ Video link added

4. **Pushed to GitHub**:
   - ✅ Screenshots in repo
   - ✅ README updated
   - ✅ All changes committed

---

## 🎯 Pro Tips

1. **Clean Up Before Screenshots**:
   - Close extra tabs
   - Hide bookmarks bar
   - Use incognito mode for clean browser

2. **Good Lighting for Video**:
   - Record in quiet environment
   - Speak clearly and confidently
   - Practice once before final recording

3. **Test Your Video**:
   - Watch it back
   - Make sure audio is clear
   - Verify screen is visible

4. **High Quality**:
   - Use 1080p resolution if possible
   - Full screen app when recording
   - No notification popups

---

## 📞 Need Help?

**Screenshot Issues**:
- Can't find Snipping Tool? Search "Snip" in Windows
- Use browser extensions like "Awesome Screenshot"

**Video Issues**:
- Loom not working? Try Windows Game Bar
- File too large? Compress with HandBrake
- Can't upload? Try Google Drive + share link

**Git Issues**:
- Large files? Check file sizes (should be < 5MB each)
- Won't push? Try `git lfs` for large files

---

## 🎉 You've Got This!

Taking screenshots and recording a demo is the final step. 

**Estimated Time**:
- Screenshots: 15 minutes
- Demo video: 20 minutes
- Upload & update README: 10 minutes

**Total: 45 minutes to complete everything!** 🚀

---

**Your app is amazing - now show it off!** 💪

