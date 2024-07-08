import { useState, useEffect } from 'react';

const globalState = {};
const listeners = {};

export function useGlobalState(key, initialValue) {
  // falls der state noch nicht initialisiert ist
  if (!globalState[key]) {
    globalState[key] = initialValue;
    listeners[key] = new Set();
  }

  const [state, setState] = useState(globalState[key]);

  useEffect(() => {
    const listener = (newState) => setState(newState);
    listeners[key].add(listener);

    return () => listeners[key].delete(listener);
  }, [key]);

  const setGlobalState = (newState) => {
    globalState[key] = newState;
    listeners[key].forEach((listener) => listener(newState));
  };

  return [state, setGlobalState];
}

// in der komponente:
//$ ---- const [myState, setMyState] = useGlobalState('myState', 'hallo'); ----
