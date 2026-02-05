/**
 * HttpClient.js - Fetch wrapper với interceptors và error handling
 */

import appConfig from '../config/app.config.js';
import { HTTP_STATUS } from '../config/constants.js';
import { ErrorHandler } from './ErrorHandler.js';
import { requestInterceptor, responseInterceptor } from './Interceptors.js';

class HttpClient {
  constructor() {
    this.baseURL = appConfig.api.baseUrl;
    this.timeout = appConfig.api.timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Set authorization token
   */
  setAuthToken(token) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  /**
   * Build full URL
   */
  buildURL(endpoint) {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    return `${this.baseURL}${endpoint}`;
  }

  /**
   * Make HTTP request với timeout
   */
  async requestWithTimeout(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Core request method
   */
  async request(method, endpoint, data = null, customHeaders = {}) {
    try {
      // Apply request interceptor
      const interceptedData = await requestInterceptor({
        method,
        endpoint,
        data,
        headers: { ...this.defaultHeaders, ...customHeaders }
      });

      // Build request options
      const options = {
        method,
        headers: interceptedData.headers
      };

      // Add body for non-GET requests
      if (data && method !== 'GET') {
        options.body = JSON.stringify(interceptedData.data || data);
      }

      // Add query params for GET requests
      let url = this.buildURL(interceptedData.endpoint || endpoint);
      if (data && method === 'GET') {
        const params = new URLSearchParams(data);
        url += `?${params.toString()}`;
      }

      // Make request
      const response = await this.requestWithTimeout(url, options);

      // Parse response
      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // Apply response interceptor
      const interceptedResponse = await responseInterceptor({
        status: response.status,
        statusText: response.statusText,
        data: responseData,
        headers: response.headers
      });

      // Check for errors
      if (!response.ok) {
        throw ErrorHandler.handleHttpError(response.status, interceptedResponse.data);
      }

      return interceptedResponse.data;

    } catch (error) {
      // Handle and throw error
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = null, headers = {}) {
    return this.request('GET', endpoint, params, headers);
  }

  /**
   * POST request
   */
  async post(endpoint, data = null, headers = {}) {
    return this.request('POST', endpoint, data, headers);
  }

  /**
   * PUT request
   */
  async put(endpoint, data = null, headers = {}) {
    return this.request('PUT', endpoint, data, headers);
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data = null, headers = {}) {
    return this.request('PATCH', endpoint, data, headers);
  }

  /**
   * DELETE request
   */
  async delete(endpoint, data = null, headers = {}) {
    return this.request('DELETE', endpoint, data, headers);
  }

  /**
   * Upload file
   */
  async upload(endpoint, file, additionalData = {}) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add additional data
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });

      // Custom headers for multipart
      const headers = { ...this.defaultHeaders };
      delete headers['Content-Type']; // Let browser set it for multipart

      const url = this.buildURL(endpoint);
      const response = await this.requestWithTimeout(url, {
        method: 'POST',
        headers,
        body: formData
      });

      if (!response.ok) {
        throw ErrorHandler.handleHttpError(response.status, await response.json());
      }

      return await response.json();

    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  /**
   * Download file
   */
  async download(endpoint, filename) {
    try {
      const url = this.buildURL(endpoint);
      const response = await this.requestWithTimeout(url, {
        method: 'GET',
        headers: this.defaultHeaders
      });

      if (!response.ok) {
        throw ErrorHandler.handleHttpError(response.status, await response.json());
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return true;

    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}

// Export singleton instance
export const httpClient = new HttpClient();
export default httpClient;

