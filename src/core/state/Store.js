/**
 * Store.js - Alpine.js reactive store wrapper
 */

import Alpine from 'alpinejs';

class Store {
  constructor(name, initialState = {}) {
    this.name = name;
    this.state = Alpine.reactive(initialState);
    this.listeners = [];
    this.middleware = [];
  }

  /**
   * Get current state
   */
  getState() {
    return this.state;
  }

  /**
   * Get specific property
   */
  get(key) {
    return this.state[key];
  }

  /**
   * Set state
   */
  setState(updates) {
    const oldState = { ...this.state };
    
    // Apply middleware
    let processedUpdates = updates;
    for (const mw of this.middleware) {
      processedUpdates = mw(oldState, processedUpdates);
    }

    // Update state
    Object.assign(this.state, processedUpdates);

    // Notify listeners
    this.notifyListeners(oldState, this.state);
  }

  /**
   * Set specific property
   */
  set(key, value) {
    this.setState({ [key]: value });
  }

  /**
   * Update state (merge with existing)
   */
  update(updates) {
    this.setState(updates);
  }

  /**
   * Reset state to initial
   */
  reset(initialState = {}) {
    const keys = Object.keys(this.state);
    keys.forEach(key => delete this.state[key]);
    Object.assign(this.state, initialState);
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners
   */
  notifyListeners(oldState, newState) {
    this.listeners.forEach(listener => {
      try {
        listener(newState, oldState);
      } catch (error) {
        console.error(`[Store:${this.name}] Listener error:`, error);
      }
    });
  }

  /**
   * Add middleware
   */
  use(middleware) {
    this.middleware.push(middleware);
    return this;
  }

  /**
   * Computed property
   */
  computed(key, fn) {
    Object.defineProperty(this.state, key, {
      get: () => fn(this.state),
      enumerable: true
    });
  }

  /**
   * Watch specific property
   */
  watch(key, callback) {
    return this.subscribe((newState, oldState) => {
      if (newState[key] !== oldState[key]) {
        callback(newState[key], oldState[key]);
      }
    });
  }
}

export default Store;
