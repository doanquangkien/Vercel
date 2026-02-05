/**
 * Interceptors.js - Request and Response interceptors
 */

import { STORAGE_KEYS } from '../config/constants.js';

/**
 * Request Interceptor
 * Được gọi trước khi request được gửi đi
 */
export async function requestInterceptor(config) {
  // Add timestamp
  config.timestamp = Date.now();

  // Add auth token if available
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Add request ID for tracking
  config.requestId = generateRequestId();
  config.headers['X-Request-ID'] = config.requestId;

  // Log request in development
  if (window.App?.config?.app?.debug) {
    console.log('[Request]', {
      id: config.requestId,
      method: config.method,
      endpoint: config.endpoint,
      data: config.data
    });
  }

  return config;
}

/**
 * Response Interceptor
 * Được gọi sau khi nhận response
 */
export async function responseInterceptor(response) {
  // Log response in development
  if (window.App?.config?.app?.debug) {
    console.log('[Response]', {
      status: response.status,
      data: response.data
    });
  }

  // Handle token refresh if needed
  if (response.headers.get('X-New-Token')) {
    const newToken = response.headers.get('X-New-Token');
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
    
    // Update HttpClient token
    if (window.App?.http) {
      window.App.http.setAuthToken(newToken);
    }
  }

  // Handle session expiry
  if (response.status === 401) {
    // Emit session expired event
    if (window.App?.bus) {
      window.App.bus.emit('auth:session:expired');
    }
  }

  return response;
}

/**
 * Generate unique request ID
 */
function generateRequestId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Custom interceptor registration
 */
class InterceptorManager {
  constructor() {
    this.requestInterceptors = [requestInterceptor];
    this.responseInterceptors = [responseInterceptor];
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
    return () => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index > -1) {
        this.requestInterceptors.splice(index, 1);
      }
    };
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index > -1) {
        this.responseInterceptors.splice(index, 1);
      }
    };
  }

  /**
   * Run all request interceptors
   */
  async runRequestInterceptors(config) {
    let result = config;
    for (const interceptor of this.requestInterceptors) {
      result = await interceptor(result);
    }
    return result;
  }

  /**
   * Run all response interceptors
   */
  async runResponseInterceptors(response) {
    let result = response;
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor(result);
    }
    return result;
  }
}

// Export singleton instance
export const interceptorManager = new InterceptorManager();
export default interceptorManager;

