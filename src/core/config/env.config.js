/**
 * env.config.js - Environment configuration loader
 * Load và validate biến môi trường
 */

import { DB_MODES } from './constants.js';

class EnvConfig {
  constructor() {
    this.config = this.loadConfig();
  }

  /**
   * Load configuration từ meta tags trong HTML
   * Trong production, các biến env được inject vào meta tags
   */
  loadConfig() {
    // Try to load from meta tags first
    const metaConfig = this.loadFromMetaTags();
    
    // Fallback to defaults
    return {
      appName: metaConfig.appName || 'MECWISH',
      appEnv: metaConfig.appEnv || 'development',
      appDebug: metaConfig.appDebug !== 'false',
      
      // Database
      dbMode: metaConfig.dbMode || DB_MODES.LOCAL,
      
      // API (for REMOTE mode)
      apiUrl: metaConfig.apiUrl || 'https://api.mecwish.com',
      apiTimeout: parseInt(metaConfig.apiTimeout) || 10000,
      
      // Auth
      jwtSecret: metaConfig.jwtSecret || 'your-secret-key-here',
      sessionTimeout: parseInt(metaConfig.sessionTimeout) || 3600,
      
      // Features
      enableAnalytics: metaConfig.enableAnalytics === 'true',
      enableErrorTracking: metaConfig.enableErrorTracking === 'true'
    };
  }

  /**
   * Load config from meta tags in HTML
   */
  loadFromMetaTags() {
    const config = {};
    const metaTags = document.querySelectorAll('meta[name^="app-"]');
    
    metaTags.forEach(meta => {
      const key = meta.getAttribute('name').replace('app-', '');
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      config[camelKey] = meta.getAttribute('content');
    });
    
    return config;
  }

  /**
   * Get config value
   */
  get(key, defaultValue = null) {
    return this.config[key] !== undefined ? this.config[key] : defaultValue;
  }

  /**
   * Check if running in development mode
   */
  isDevelopment() {
    return this.config.appEnv === 'development';
  }

  /**
   * Check if running in production mode
   */
  isProduction() {
    return this.config.appEnv === 'production';
  }

  /**
   * Check if debug mode is enabled
   */
  isDebug() {
    return this.config.appDebug === true;
  }

  /**
   * Check if using local database
   */
  isLocalMode() {
    return this.config.dbMode === DB_MODES.LOCAL;
  }

  /**
   * Check if using remote API
   */
  isRemoteMode() {
    return this.config.dbMode === DB_MODES.REMOTE;
  }

  /**
   * Get all config
   */
  all() {
    return { ...this.config };
  }
}

// Export singleton instance
export const envConfig = new EnvConfig();
export default envConfig;
