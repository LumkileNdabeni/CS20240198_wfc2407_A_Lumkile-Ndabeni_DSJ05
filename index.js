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
    
    // Initial dispatch to populate the initial state
    dispatch({});

    return { getState, dispatch, subscribe };
  }

  // Reducer function to handle state changes
function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD:
        return { count: state.count + 1 };
      case SUBTRACT:
        return { count: state.count - 1 };
      case RESET:
        return { count: 0 };
      default:
        return state;
    }
  }

  // Create the store with the tally reducer
  const store = createStore(reducer);

// Subscribe to log the state changes
store.subscribe(() => console.log('State:', store.getState()));

// Testing the scenarios

// Scenario 1: Initial State Verification
console.log('Initial State:', store.getState().count); // Expected: { count: 0 }

// Scenario 2: Incrementing the Counter
store.dispatch({ type: ADD });                 // Expected: { count: 1 }
store.dispatch({ type: ADD });                 // Expected: { count: 2 }

// Scenario 3: Decrementing the Counter
store.dispatch({ type: SUBTRACT });            // Expected: { count: 1 }

// Scenario 4: Resetting the Counter
store.dispatch({ type: RESET });               // Expected: { count: 0 }