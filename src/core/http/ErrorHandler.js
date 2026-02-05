/**
 * ErrorHandler.js - Centralized error handling
 */

import { HTTP_STATUS } from '../config/constants.js';
import { ERROR_EVENTS } from '../events/eventTypes.js';

class ErrorHandler {
  constructor() {
    this.errorListeners = [];
  }

  /**
   * Handle HTTP error based on status code
   */
  handleHttpError(status, data) {
    const error = new Error(data?.message || 'HTTP Error');
    error.status = status;
    error.data = data;
    error.type = this.getErrorType(status);
    
    return error;
  }

  /**
   * Get error type from status code
   */
  getErrorType(status) {
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return ERROR_EVENTS.VALIDATION_ERROR;
      case HTTP_STATUS.UNAUTHORIZED:
        return ERROR_EVENTS.PERMISSION_ERROR;
      case HTTP_STATUS.FORBIDDEN:
        return ERROR_EVENTS.PERMISSION_ERROR;
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_EVENTS.NOT_FOUND_ERROR;
      case HTTP_STATUS.CONFLICT:
        return ERROR_EVENTS.CONFLICT_ERROR;
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        return ERROR_EVENTS.VALIDATION_ERROR;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return ERROR_EVENTS.NETWORK_ERROR;
      default:
        return ERROR_EVENTS.UNEXPECTED_ERROR;
    }
  }

  /**
   * Handle generic error
   */
  handle(error) {
    // Normalize error object
    const normalizedError = this.normalizeError(error);
    
    // Log error in development
    if (window.App?.config?.app?.debug) {
      console.error('[ErrorHandler]', normalizedError);
    }

    // Notify listeners
    this.notifyListeners(normalizedError);

    // Emit global error event
    if (window.App?.bus) {
      window.App.bus.emit('app:error', normalizedError);
    }

    return normalizedError;
  }

  /**
   * Normalize different error types
   */
  normalizeError(error) {
    // Already normalized
    if (error.type) {
      return error;
    }

    // Network error
    if (error.message === 'Failed to fetch' || error.message === 'Request timeout') {
      return {
        type: ERROR_EVENTS.NETWORK_ERROR,
        message: error.message === 'Request timeout' 
          ? 'Yêu cầu quá thời gian. Vui lòng thử lại.'
          : 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.',
        originalError: error
      };
    }

    // Validation error
    if (error.name === 'ValidationError') {
      return {
        type: ERROR_EVENTS.VALIDATION_ERROR,
        message: error.message || 'Dữ liệu không hợp lệ',
        errors: error.errors || {},
        originalError: error
      };
    }

    // Database error
    if (error.name === 'DatabaseError') {
      return {
        type: ERROR_EVENTS.DATABASE_ERROR,
        message: 'Lỗi cơ sở dữ liệu. Vui lòng thử lại.',
        originalError: error
      };
    }

    // Generic error
    return {
      type: ERROR_EVENTS.UNEXPECTED_ERROR,
      message: error.message || 'Đã xảy ra lỗi không xác định',
      originalError: error
    };
  }

  /**
   * Register error listener
   */
  onError(callback) {
    this.errorListeners.push(callback);
    return () => {
      const index = this.errorListeners.indexOf(callback);
      if (index > -1) {
        this.errorListeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners
   */
  notifyListeners(error) {
    this.errorListeners.forEach(callback => {
      try {
        callback(error);
      } catch (e) {
        console.error('[ErrorHandler] Listener error:', e);
      }
    });
  }

  /**
   * Create validation error
   */
  static validationError(message, errors = {}) {
    const error = new Error(message);
    error.name = 'ValidationError';
    error.errors = errors;
    return error;
  }

  /**
   * Create database error
   */
  static databaseError(message) {
    const error = new Error(message);
    error.name = 'DatabaseError';
    return error;
  }

  /**
   * Create not found error
   */
  static notFoundError(resource) {
    const error = new Error(`${resource} không tồn tại`);
    error.type = ERROR_EVENTS.NOT_FOUND_ERROR;
    error.status = HTTP_STATUS.NOT_FOUND;
    return error;
  }

  /**
   * Create permission error
   */
  static permissionError(message = 'Bạn không có quyền thực hiện thao tác này') {
    const error = new Error(message);
    error.type = ERROR_EVENTS.PERMISSION_ERROR;
    error.status = HTTP_STATUS.FORBIDDEN;
    return error;
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();
export { ErrorHandler };
export default errorHandler;

