/**
 * createStore.js - Store factory function
 */

import Store from './Store.js';
import { loggerMiddleware } from './middleware/logger.js';
import { persistMiddleware } from './middleware/persist.js';

/**
 * Create a new store instance
 */
export function createStore(name, initialState = {}, options = {}) {
  const store = new Store(name, initialState);

  // Apply middleware based on options
  if (options.logger && window.App?.config?.app?.debug) {
    store.use(loggerMiddleware(name));
  }

  if (options.persist) {
    const persistConfig = typeof options.persist === 'object' 
      ? options.persist 
      : { key: name };
    store.use(persistMiddleware(persistConfig));
  }

  // Custom middleware
  if (options.middleware && Array.isArray(options.middleware)) {
    options.middleware.forEach(mw => store.use(mw));
  }

  // Register in global stores registry
  if (window.App) {
    if (!window.App.stores) {
      window.App.stores = {};
    }
    window.App.stores[name] = store;
  }

  return store;
}

/**
 * Get existing store
 */
export function getStore(name) {
  return window.App?.stores?.[name] || null;
}

/**
 * Remove store
 */
export function removeStore(name) {
  if (window.App?.stores?.[name]) {
    delete window.App.stores[name];
    return true;
  }
  return false;
}

export default createStore;
