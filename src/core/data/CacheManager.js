/**
 * CacheManager.js - In-memory cache manager
 */

import { CACHE_TTL } from '../config/constants.js';

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
  }

  /**
   * Generate cache key
   */
  generateKey(prefix, params = {}) {
    const paramStr = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    return paramStr ? `${prefix}:${paramStr}` : prefix;
  }

  /**
   * Set cache with TTL
   */
  set(key, value, ttl = CACHE_TTL.MEDIUM) {
    // Clear existing timer
    this.clearTimer(key);

    // Set value
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });

    // Set expiration timer
    if (ttl > 0) {
      const timer = setTimeout(() => {
        this.delete(key);
      }, ttl);
      this.timers.set(key, timer);
    }

    return true;
  }

  /**
   * Get cache value
   */
  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (entry.ttl > 0) {
      const age = Date.now() - entry.timestamp;
      if (age > entry.ttl) {
        this.delete(key);
        return null;
      }
    }

    return entry.value;
  }

  /**
   * Check if key exists and is valid
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Delete cache entry
   */
  delete(key) {
    this.clearTimer(key);
    return this.cache.delete(key);
  }

  /**
   * Clear timer for key
   */
  clearTimer(key) {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    // Clear all timers
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
    
    // Clear cache
    this.cache.clear();
  }

  /**
   * Clear cache by prefix
   */
  clearByPrefix(prefix) {
    const keys = Array.from(this.cache.keys());
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        this.delete(key);
      }
    });
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * Wrap function with caching
   */
  wrap(key, fn, ttl = CACHE_TTL.MEDIUM) {
    return async (...args) => {
      // Generate cache key with args
      const cacheKey = args.length > 0 
        ? this.generateKey(key, { args: JSON.stringify(args) })
        : key;

      // Check cache
      const cached = this.get(cacheKey);
      if (cached !== null) {
        return cached;
      }

      // Execute function
      const result = await fn(...args);
      
      // Cache result
      this.set(cacheKey, result, ttl);
      
      return result;
    };
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();
export default cacheManager;
