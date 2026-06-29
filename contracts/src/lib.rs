#![no_std]

//! # Counter Smart Contract
//! 
//! A simple counter contract deployed on Stellar Soroban testnet.
//! Contract Address: CCWVVZGR3DDKH2J7QYLMGK2RWCKVZWPHGXV6Y3CXKXMQZKNF4LQHM5DW
//! 
//! This contract demonstrates:
//! - Persistent storage on Stellar blockchain
//! - State management with increment operations
//! - Public functions callable from frontend applications
//! - Error handling and validation

use soroban_sdk::{contract, contractimpl, Env, Symbol, symbol_short};

// Storage key for the counter value
const COUNTER: Symbol = symbol_short!("COUNTER");

/// Counter contract that maintains a persistent counter value
#[contract]
pub struct CounterContract;

#[contractimpl]
impl CounterContract {
    /// Increment the counter by 1 and return the new value
    /// 
    /// # Returns
    /// The new counter value after incrementing
    /// 
    /// # Examples
    /// ```
    /// let new_value = contract.increment(&env);
    /// ```
    pub fn increment(env: Env) -> u32 {
        // Get the current counter value, defaulting to 0 if not set
        let mut count: u32 = env.storage().instance().get(&COUNTER).unwrap_or(0);
        
        // Increment the counter
        count += 1;
        
        // Store the new value persistently
        env.storage().instance().set(&COUNTER, &count);
        
        // Return the new counter value
        count
    }

    /// Get the current counter value without modifying it
    /// 
    /// # Returns
    /// The current counter value, or 0 if never incremented
    /// 
    /// # Examples
    /// ```
    /// let current_value = contract.get_count(&env);
    /// ```
    pub fn get_count(env: Env) -> u32 {
        // Retrieve the current counter value, defaulting to 0
        env.storage().instance().get(&COUNTER).unwrap_or(0)
    }

    /// Reset the counter to 0
    /// 
    /// # Returns
    /// Always returns 0
    /// 
    /// # Examples
    /// ```
    /// let reset_value = contract.reset(&env);
    /// ```
    pub fn reset(env: Env) -> u32 {
        // Set counter to 0
        env.storage().instance().set(&COUNTER, &0);
        0
    }

    /// Increment the counter by a custom amount
    /// 
    /// # Arguments
    /// * `amount` - The amount to add to the counter
    /// 
    /// # Returns
    /// The new counter value after incrementing
    /// 
    /// # Examples
    /// ```
    /// let new_value = contract.increment_by(&env, 5);
    /// ```
    pub fn increment_by(env: Env, amount: u32) -> u32 {
        // Get the current counter value
        let mut count: u32 = env.storage().instance().get(&COUNTER).unwrap_or(0);
        
        // Add the specified amount
        count += amount;
        
        // Store the new value
        env.storage().instance().set(&COUNTER, &count);
        
        // Return the new counter value
        count
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::Env;

    #[test]
    fn test_increment() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CounterContract);
        let client = CounterContractClient::new(&env, &contract_id);

        // Initial increment should return 1
        assert_eq!(client.increment(), 1);
        
        // Second increment should return 2
        assert_eq!(client.increment(), 2);
        
        // Third increment should return 3
        assert_eq!(client.increment(), 3);
    }

    #[test]
    fn test_get_count() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CounterContract);
        let client = CounterContractClient::new(&env, &contract_id);

        // Initial count should be 0
        assert_eq!(client.get_count(), 0);
        
        // After increment, count should be 1
        client.increment();
        assert_eq!(client.get_count(), 1);
        
        // After another increment, count should be 2
        client.increment();
        assert_eq!(client.get_count(), 2);
    }

    #[test]
    fn test_reset() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CounterContract);
        let client = CounterContractClient::new(&env, &contract_id);

        // Increment a few times
        client.increment();
        client.increment();
        client.increment();
        assert_eq!(client.get_count(), 3);
        
        // Reset should return 0
        assert_eq!(client.reset(), 0);
        
        // Count should be 0 after reset
        assert_eq!(client.get_count(), 0);
    }

    #[test]
    fn test_increment_by() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CounterContract);
        let client = CounterContractClient::new(&env, &contract_id);

        // Increment by 5
        assert_eq!(client.increment_by(&5), 5);
        
        // Increment by 10 more
        assert_eq!(client.increment_by(&10), 15);
        
        // Verify final count
        assert_eq!(client.get_count(), 15);
    }

    #[test]
    fn test_multiple_operations() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CounterContract);
        let client = CounterContractClient::new(&env, &contract_id);

        // Start at 0
        assert_eq!(client.get_count(), 0);
        
        // Increment by 1
        client.increment();
        assert_eq!(client.get_count(), 1);
        
        // Increment by 5
        client.increment_by(&5);
        assert_eq!(client.get_count(), 6);
        
        // Regular increment
        client.increment();
        assert_eq!(client.get_count(), 7);
        
        // Reset
        client.reset();
        assert_eq!(client.get_count(), 0);
        
        // Increment after reset
        client.increment();
        assert_eq!(client.get_count(), 1);
    }
}
