# Makefile for Counter Smart Contract

.PHONY: all build test clean optimize deploy help

# Default target
all: build test

# Build the contract
build:
	@echo "🔨 Building counter contract..."
	@cargo build --target wasm32-unknown-unknown --release
	@echo "✅ Build complete!"

# Run tests
test:
	@echo "🧪 Running tests..."
	@cargo test
	@echo "✅ All tests passed!"

# Run tests with output
test-verbose:
	@echo "🧪 Running tests with output..."
	@cargo test -- --nocapture

# Optimize the WASM binary
optimize: build
	@echo "⚡ Optimizing WASM..."
	@soroban contract optimize \
		--wasm target/wasm32-unknown-unknown/release/counter_contract.wasm
	@echo "✅ Optimization complete!"

# Format code
fmt:
	@echo "💅 Formatting code..."
	@cargo fmt
	@echo "✅ Formatting complete!"

# Lint code
lint:
	@echo "🔍 Linting code..."
	@cargo clippy -- -D warnings
	@echo "✅ Linting complete!"

# Clean build artifacts
clean:
	@echo "🧹 Cleaning..."
	@cargo clean
	@echo "✅ Clean complete!"

# Generate documentation
docs:
	@echo "📚 Generating documentation..."
	@cargo doc --open
	@echo "✅ Documentation generated!"

# Deploy to testnet (requires soroban CLI configured)
deploy: optimize
	@echo "🚀 Deploying to testnet..."
	@soroban contract deploy \
		--wasm target/wasm32-unknown-unknown/release/counter_contract.wasm \
		--source deployer \
		--network testnet
	@echo "✅ Deployment complete!"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@rustup target add wasm32-unknown-unknown
	@cargo install --locked soroban-cli
	@echo "✅ Dependencies installed!"

# Check contract size
size: build
	@echo "📏 Contract size:"
	@ls -lh target/wasm32-unknown-unknown/release/counter_contract.wasm

# Run all quality checks
check: fmt lint test
	@echo "✅ All checks passed!"

# Help
help:
	@echo "Counter Smart Contract - Available Commands:"
	@echo ""
	@echo "  make build           - Build the contract"
	@echo "  make test            - Run tests"
	@echo "  make test-verbose    - Run tests with output"
	@echo "  make optimize        - Optimize WASM binary"
	@echo "  make fmt             - Format code"
	@echo "  make lint            - Lint code"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make docs            - Generate documentation"
	@echo "  make deploy          - Deploy to testnet"
	@echo "  make install         - Install dependencies"
	@echo "  make size            - Check contract size"
	@echo "  make check           - Run all quality checks"
	@echo "  make help            - Show this help"
	@echo ""
