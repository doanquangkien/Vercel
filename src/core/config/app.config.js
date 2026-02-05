/**
 * app.config.js - Application configuration
 * Cấu hình chính cho toàn bộ application
 */

import envConfig from './env.config.js';
import * as CONSTANTS from './constants.js';

class AppConfig {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.app = {
      name: envConfig.get('appName'),
      version: '3.2.0',
      env: envConfig.get('appEnv'),
      debug: envConfig.get('appDebug')
    };

    this.database = {
      mode: envConfig.get('dbMode'),
      name: CONSTANTS.INDEXEDDB_CONFIG.DB_NAME,
      version: CONSTANTS.INDEXEDDB_CONFIG.DB_VERSION,
      stores: CONSTANTS.INDEXEDDB_CONFIG.STORES
    };

    this.api = {
      baseUrl: envConfig.get('apiUrl'),
      timeout: envConfig.get('apiTimeout'),
      endpoints: CONSTANTS.API_ENDPOINTS
    };

    this.auth = {
      tokenKey: CONSTANTS.STORAGE_KEYS.AUTH_TOKEN,
      refreshTokenKey: CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
      userDataKey: CONSTANTS.STORAGE_KEYS.USER_DATA,
      sessionTimeout: envConfig.get('sessionTimeout') * 1000, // Convert to ms
      autoLogoutWarning: CONSTANTS.DEFAULTS.AUTO_LOGOUT_WARNING
    };

    this.ui = {
      theme: {
        default: 'light',
        storageKey: CONSTANTS.STORAGE_KEYS.THEME
      },
      notification: {
        duration: 3000,
        position: 'top-right'
      },
      pagination: CONSTANTS.PAGINATION,
      dateFormat: CONSTANTS.DATE_FORMATS
    };

    this.features = {
      analytics: envConfig.get('enableAnalytics'),
      errorTracking: envConfig.get('enableErrorTracking'),
      offlineMode: true,
      autoSave: true
    };

    this.validation = CONSTANTS.VALIDATION;
    this.currency = CONSTANTS.CURRENCY;
    this.cache = CONSTANTS.CACHE_TTL;
  }

  /**
   * Get configuration section
   */
  get(section) {
    return this[section] || null;
  }

  /**
   * Get all configuration
   */
  all() {
    return {
      app: this.app,
      database: this.database,
      api: this.api,
      auth: this.auth,
      ui: this.ui,
      features: this.features,
      validation: this.validation,
      currency: this.currency,
      cache: this.cache
    };
  }

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(feature) {
    return this.features[feature] === true;
  }

  /**
   * Update configuration (runtime only, không persist)
   */
  update(section, key, value) {
    if (this[section] && this[section][key] !== undefined) {
      this[section][key] = value;
      return true;
    }
    return false;
  }
}

// Export singleton instance
export const appConfig = new AppConfig();
export default appConfig;

