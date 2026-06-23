# 🧪 Testing Guide

Complete guide for testing the Stellar Multi-Wallet Application.

---

## 📋 Table of Contents

1. [Test Suite Overview](#test-suite-overview)
2. [Running Tests](#running-tests)
3. [Test Files](#test-files)
4. [Writing New Tests](#writing-new-tests)
5. [CI/CD Integration](#cicd-integration)

---

## 🎯 Test Suite Overview

### Total Tests: 33+

```
src/test/
├── App.test.jsx           (10 tests)
├── contractConfig.test.js  (8 tests)
└── utils.test.js          (15 tests)
```

### Test Coverage

- **Component Tests**: UI rendering and interactions
- **Configuration Tests**: Contract setup validation
- **Utility Tests**: Helper function logic
- **Integration Tests**: Wallet connection flows

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with UI
```bash
npm run test:ui
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### Run Specific Test File
```bash
npm test src/test/App.test.jsx
```

---

## 📝 Test Files

### 1. App.test.jsx

Tests the main application component.

**Test Cases:**
1. ✅ Renders app title correctly
2. ✅ Shows connect wallet button initially
3. ✅ Displays Level 2.3 requirements
4. ✅ Shows wallet selection on button click
5. ✅ Displays Freighter wallet option
6. ✅ Displays xBull wallet option
7. ✅ Shows back button in wallet selection
8. ✅ Returns to main screen on back click
9. ✅ Handles wallet connection attempt
10. ✅ Displays contract address constant

**Example Test:**
```javascript
it('renders the app title correctly', () => {
  render(<App />)
  expect(screen.getByText(/Stellar Multi-Wallet App/i)).toBeInTheDocument()
})
```

---

### 2. contractConfig.test.js

Tests contract configuration values.

**Test Cases:**
1. ✅ Has valid contract address
2. ✅ Has valid contract ID in hex
3. ✅ Uses correct testnet network passphrase
4. ✅ Uses correct Horizon testnet URL
5. ✅ Uses correct Soroban RPC URL
6. ✅ Defines contract functions
7. ✅ Defines transaction configuration
8. ✅ Exports all required configuration

**Example Test:**
```javascript
it('has a valid contract address', () => {
  expect(CONTRACT_ADDRESS).toBeDefined()
  expect(typeof CONTRACT_ADDRESS).toBe('string')
  expect(CONTRACT_ADDRESS).toMatch(/^C[A-Z0-9]{55}$/)
})
```

---

### 3. utils.test.js

Tests utility functions.

**Test Cases:**
1-5. formatAddress() tests
6-10. validateStellarAddress() tests
11-15. formatBalance() tests

**Example Test:**
```javascript
it('formats long addresses correctly', () => {
  const address = 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  const formatted = formatAddress(address)
  expect(formatted).toBe('GXXXXXXX...XXXXXXXX')
})
```

---

## ✍️ Writing New Tests

### Test Structure

```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText(/My Text/i)).toBeInTheDocument()
  })
})
```

### Testing Best Practices

1. **One assertion per test**
2. **Clear test descriptions**
3. **Arrange-Act-Assert pattern**
4. **Mock external dependencies**
5. **Test user behavior, not implementation**

### Common Testing Patterns

**Component Rendering:**
```javascript
it('renders component', () => {
  render(<Component />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

**User Interactions:**
```javascript
it('handles button click', async () => {
  const user = userEvent.setup()
  render(<Component />)
  await user.click(screen.getByRole('button'))
  expect(screen.getByText(/Result/i)).toBeInTheDocument()
})
```

**Async Operations:**
```javascript
it('fetches data', async () => {
  render(<Component />)
  await waitFor(() => {
    expect(screen.getByText(/Data/i)).toBeInTheDocument()
  })
})
```

---

## 🔄 CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Push to `main` branch
- Pull requests
- Manual workflow dispatch

### Workflow File

`.github/workflows/ci.yml`

```yaml
test:
  name: Run Tests
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci
    - run: npm test
    - run: npm run test:coverage
```

### Test Results

View results in:
- GitHub Actions tab
- Pull request checks
- Coverage reports

---

## 📊 Coverage Reports

### Generate Report
```bash
npm run test:coverage
```

### View Coverage
- **Terminal**: Summary in console
- **HTML**: Open `coverage/index.html`
- **CI/CD**: Uploaded to Codecov

### Target Coverage
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

---

## 🐛 Debugging Tests

### Run Single Test
```bash
npm test -- -t "test name"
```

### Debug in VS Code

`.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["test", "--", "--run"],
  "console": "integratedTerminal"
}
```

### Common Issues

**Issue**: Tests timing out
**Solution**: Increase timeout
```javascript
it('test', async () => {
  // ...
}, 10000) // 10 second timeout
```

**Issue**: Mocks not working
**Solution**: Clear mocks between tests
```javascript
beforeEach(() => {
  vi.clearAllMocks()
})
```

---

## 🎯 Test Checklist

Before committing code:

- [ ] All tests passing
- [ ] New features have tests
- [ ] Coverage above 80%
- [ ] No skipped tests
- [ ] No console errors
- [ ] Tests run in CI/CD

---

## 📚 Testing Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated**: December 2024
**Test Count**: 33+
**Coverage**: 85%+
