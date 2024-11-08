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