/**
 * EventBus.js - Hệ thống Pub/Sub cho giao tiếp giữa các module
 * 
 * Chức năng:
 * - Cho phép modules giao tiếp mà không phụ thuộc trực tiếp vào nhau
 * - Hỗ trợ wildcard events (product:*, order:*)
 * - Event replay để debug
 * - Priority handling cho events quan trọng
 */

class EventBus {
  constructor() {
    this.listeners = new Map();
    this.eventHistory = [];
    this.maxHistorySize = 100;
    this.wildcardListeners = [];
    this.debug = false;
  }

  on(eventName, callback, options = {}) {
    const { priority = 0, once = false } = options;

    if (eventName.includes('*')) {
      this.wildcardListeners.push({
        pattern: this._createWildcardPattern(eventName),
        callback,
        priority,
        once
      });
      return () => this._removeWildcardListener(callback);
    }

    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const listener = { callback, priority, once };
    const listeners = this.listeners.get(eventName);
    
    listeners.push(listener);
    listeners.sort((a, b) => b.priority - a.priority);

    if (this.debug) {
      console.log(`[EventBus] Registered: ${eventName}`);
    }

    return () => this.off(eventName, callback);
  }

  once(eventName, callback, options = {}) {
    return this.on(eventName, callback, { ...options, once: true });
  }

  off(eventName, callback) {
    if (!this.listeners.has(eventName)) return;

    const listeners = this.listeners.get(eventName);
    const index = listeners.findIndex(l => l.callback === callback);
    
    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
      this.listeners.delete(eventName);
    }
  }

  emit(eventName, data = null, meta = {}) {
    const { async = false } = meta;
    
    this._addToHistory(eventName, data);

    if (this.debug) {
      console.log(`[EventBus] Emit: ${eventName}`, data);
    }

    this._triggerWildcardListeners(eventName, data);

    if (!this.listeners.has(eventName)) {
      return async ? Promise.resolve() : undefined;
    }

    const listeners = [...this.listeners.get(eventName)];

    if (async) {
      return this._emitAsync(eventName, listeners, data);
    } else {
      return this._emitSync(eventName, listeners, data);
    }
  }

  async _emitAsync(eventName, listeners, data) {
    for (const listener of listeners) {
      try {
        await listener.callback(data);
      } catch (err) {
        console.error(`[EventBus] Error in ${eventName}:`, err);
      }
    }
    this._removeOnceListeners(eventName, listeners);
  }

  _emitSync(eventName, listeners, data) {
    for (const listener of listeners) {
      try {
        listener.callback(data);
      } catch (err) {
        console.error(`[EventBus] Error in ${eventName}:`, err);
      }
    }
    this._removeOnceListeners(eventName, listeners);
  }

  _removeOnceListeners(eventName, executedListeners) {
    if (!this.listeners.has(eventName)) return;

    const onceListeners = executedListeners.filter(l => l.once);
    if (onceListeners.length === 0) return;

    const remaining = this.listeners.get(eventName).filter(
      l => !onceListeners.includes(l)
    );

    if (remaining.length === 0) {
      this.listeners.delete(eventName);
    } else {
      this.listeners.set(eventName, remaining);
    }
  }

  _createWildcardPattern(wildcardStr) {
    const pattern = wildcardStr.replace(/\*/g, '.*').replace(/:/g, '\\:');
    return new RegExp(`^${pattern}$`);
  }

  _triggerWildcardListeners(eventName, data) {
    const matched = this.wildcardListeners.filter(wl =>
      wl.pattern.test(eventName)
    );

    for (const listener of matched) {
      try {
        listener.callback(data, eventName);
      } catch (err) {
        console.error(`[EventBus] Wildcard error:`, err);
      }
    }

    this.wildcardListeners = this.wildcardListeners.filter(
      wl => !matched.includes(wl) || !wl.once
    );
  }

  _removeWildcardListener(callback) {
    const index = this.wildcardListeners.findIndex(wl => wl.callback === callback);
    if (index !== -1) {
      this.wildcardListeners.splice(index, 1);
    }
  }

  _addToHistory(eventName, data) {
    this.eventHistory.push({ eventName, data, timestamp: Date.now() });
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }
  }

  getHistory(filter = null) {
    if (!filter) return [...this.eventHistory];
    return this.eventHistory.filter(event => {
      if (typeof filter === 'string') return event.eventName === filter;
      if (filter instanceof RegExp) return filter.test(event.eventName);
      return true;
    });
  }

  clear() {
    this.listeners.clear();
    this.wildcardListeners = [];
    this.eventHistory = [];
  }

  setDebug(enabled) {
    this.debug = enabled;
  }
}

export default new EventBus();