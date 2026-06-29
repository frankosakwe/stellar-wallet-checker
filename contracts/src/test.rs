// Additional test file for contract testing
// Tests are also included in lib.rs

use crate::{CounterContract, CounterContractClient};
use soroban_sdk::Env;

#[test]
fn test_contract_deployment() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CounterContract);
    let client = CounterContractClient::new(&env, &contract_id);

    // Verify contract deploys successfully
    assert_eq!(client.get_count(), 0);
}

#[test]
fn test_increment_sequence() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CounterContract);
    let client = CounterContractClient::new(&env, &contract_id);

    // Test a longer sequence
    for i in 1..=10 {
        assert_eq!(client.increment(), i);
    }
}

#[test]
fn test_increment_by_zero() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CounterContract);
    let client = CounterContractClient::new(&env, &contract_id);

    // Increment by 0 should not change value
    assert_eq!(client.increment_by(&0), 0);
    assert_eq!(client.get_count(), 0);
}

#[test]
fn test_large_increment() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CounterContract);
    let client = CounterContractClient::new(&env, &contract_id);

    // Test large increment
    let large_value = 1000000_u32;
    assert_eq!(client.increment_by(&large_value), large_value);
    assert_eq!(client.get_count(), large_value);
}

#[test]
fn test_reset_after_large_value() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CounterContract);
    let client = CounterContractClient::new(&env, &contract_id);

    // Set to large value then reset
    client.increment_by(&999999);
    assert_eq!(client.reset(), 0);
    assert_eq!(client.get_count(), 0);
}
