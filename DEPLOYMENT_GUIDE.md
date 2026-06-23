# 🚀 Deployment Guide

Complete guide for deploying the Stellar Multi-Wallet Application.

---

## 📋 Pre-Deployment Checklist

- [ ] All tests passing (`npm test`)
- [ ] Build successful (`npm run build`)
- [ ] Environment variables configured
- [ ] Contract deployed to testnet
- [ ] Documentation updated
- [ ] Screenshots prepared

---

## 🔧 Environment Setup

### Required Environment Variables

Create `.env` file (not committed to git):

```env
# Network Configuration
VITE_NETWORK=testnet
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# Contract Configuration
VITE_CONTRACT_ADDRESS=CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW

# Analytics (Optional)
VITE_ANALYTICS_ID=your-analytics-id
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

#### Prerequisites
- Vercel account
- GitHub repository connected

#### Steps

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
# Build first
npm run build

# Deploy to production
vercel --prod
```

4. **Configure in Vercel Dashboard**:
- Go to project settings
- Add environment variables
- Configure custom domain (optional)

#### Vercel Configuration

File: `vercel.json` (already created)

```json
{
  "version": 2,
  "builds": [{
    "src": "package.json",
    "use": "@vercel/static-build"
  }]
}
```

---

### Option 2: Netlify

#### Prerequisites
- Netlify account
- GitHub repository connected

#### Steps

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Deploy**:
```bash
# Build first
npm run build

# Deploy to production
netlify deploy --prod --dir=dist
```

4. **Configure in Netlify Dashboard**:
- Go to Site settings → Build & deploy
- Add environment variables
- Configure custom domain

#### Netlify Configuration

File: `netlify.toml` (already created)

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

### Option 3: GitHub Pages

#### Prerequisites
- GitHub repository
- gh-pages package

#### Steps

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add deploy script** to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Update `vite.config.js`**:
```javascript
export default defineConfig({
  base: '/stellar-wallet-checker/',
  // ... other config
})
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Configure GitHub Pages**:
- Go to repository Settings → Pages
- Source: gh-pages branch
- Save

---

## 🔄 CI/CD Setup

### GitHub Actions (Automatic Deployment)

File: `.github/workflows/ci.yml` (already created)

#### Required Secrets

Add these in GitHub repository settings → Secrets:

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

#### Get Vercel Tokens

1. **Vercel Token**:
```bash
vercel login
vercel whoami # Shows your username
# Generate token at: https://vercel.com/account/tokens
```

2. **Project IDs**:
```bash
# Link project first
vercel link

# Get IDs from .vercel/project.json
cat .vercel/project.json
```

#### Workflow Triggers

- **Push to main**: Deploy to production
- **Pull Request**: Deploy preview
- **Push to develop**: Run tests only

---

## 📊 Post-Deployment Verification

### 1. Smoke Tests

Visit your deployed site and verify:

- [ ] Page loads correctly
- [ ] Wallet connection works
- [ ] Contract interaction works
- [ ] Event log displays
- [ ] Mobile view renders correctly
- [ ] All links work

### 2. Performance Check

Use tools:
- Google Lighthouse
- WebPageTest
- GTmetrix

Target Scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### 3. Security Check

- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] No exposed secrets
- [ ] CSP headers configured
- [ ] No mixed content warnings

---

## 🔧 Troubleshooting

### Build Failures

**Issue**: Build fails with module not found

**Solution**:
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working

**Issue**: Variables undefined in production

**Solution**:
- Ensure variables start with `VITE_`
- Rebuild after adding variables
- Check deployment platform settings

### Wallet Connection Fails

**Issue**: Freighter not detected

**Solution**:
- Verify HTTPS enabled
- Check browser console for errors
- Ensure correct network (testnet)

### Contract Call Fails

**Issue**: Transaction submission fails

**Solution**:
- Verify contract address correct
- Check account has sufficient balance
- Verify network passphrase matches

---

## 📱 Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Netlify

1. Go to Domain Settings
2. Add custom domain
3. Configure DNS:
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## 🔐 Security Best Practices

### 1. Environment Variables

Never commit:
- Private keys
- API secrets
- Access tokens

### 2. Dependency Security

Regular updates:
```bash
npm audit
npm audit fix
```

### 3. CORS Configuration

If using API:
```javascript
// Restrict origins
const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com'
]
```

---

## 📈 Monitoring & Analytics

### Setup Google Analytics

1. Create GA4 property
2. Get Measurement ID
3. Add to environment:
```env
VITE_GA_ID=G-XXXXXXXXXX
```

### Error Tracking with Sentry

1. Create Sentry project
2. Install SDK:
```bash
npm install @sentry/react
```

3. Initialize:
```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE
})
```

---

## 🔄 Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Netlify

```bash
# List deployments
netlify deploy:list

# Rollback via dashboard
# Go to Deploys → Select deployment → Publish
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Lint errors fixed
- [ ] Build successful
- [ ] Environment variables set
- [ ] Contract verified on explorer

### During Deployment
- [ ] Deployment completes successfully
- [ ] No build warnings
- [ ] Assets uploaded correctly
- [ ] DNS configured (if custom domain)

### Post-Deployment
- [ ] Site accessible
- [ ] Functionality verified
- [ ] Performance acceptable
- [ ] Analytics working
- [ ] Error tracking active

---

## 🎯 Production URLs

### Main Deployment
- **Production**: https://stellar-wallet-checker.vercel.app
- **Repository**: https://github.com/frankosakwe/stellar-wallet-checker

### Contract
- **Address**: `CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW`
- **Explorer**: https://stellar.expert/explorer/testnet/contract/...

---

## 📞 Support

### Issues?

1. Check deployment logs
2. Review troubleshooting section
3. Check GitHub Issues
4. Contact maintainer

---

**Last Updated**: December 2024
**Deployment Version**: 3.0.0
