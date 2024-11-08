// Initial state
const initialState = {
    count: 0
  };
  
  // Action types
  const ADD = 'ADD';
  const SUBTRACT = 'SUBTRACT';
  const RESET = 'RESET';
  
  // Store
  function createStore(reducer) {
    let state = initialState;
    let listeners = [];
  
    // Returns the current state
    const getState = () => state;
  
    // Dispatches an action to change the state
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  
    // Subscribes a listener to state changes
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
  