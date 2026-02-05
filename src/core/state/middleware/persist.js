/**
 * persist.js - Store persistence middleware
 */

export function persistMiddleware(config = {}) {
  const {
    key,
    storage = localStorage,
    serialize = JSON.stringify,
    deserialize = JSON.parse
  } = config;

  // Load persisted state
  if (key) {
    try {
      const persisted = storage.getItem(key);
      if (persisted) {
        const state = deserialize(persisted);
        // This will be applied as initial state
        return (oldState, updates) => {
          const newState = { ...oldState, ...updates };
          
          // Persist to storage
          try {
            storage.setItem(key, serialize(newState));
          } catch (error) {
            console.error('[Persist Middleware] Save error:', error);
          }
          
          return updates;
        };
      }
    } catch (error) {
      console.error('[Persist Middleware] Load error:', error);
    }
  }

  // Return middleware function
  return (oldState, updates) => {
    if (key) {
      const newState = { ...oldState, ...updates };
      try {
        storage.setItem(key, serialize(newState));
      } catch (error) {
        console.error('[Persist Middleware] Save error:', error);
      }
    }
    return updates;
  };
}

export default persistMiddleware;
