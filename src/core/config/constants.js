/**
 * constants.js - System-wide constants
 * Định nghĩa các hằng số được sử dụng xuyên suốt hệ thống
 */

// Database modes
export const DB_MODES = {
  LOCAL: 'LOCAL',
  REMOTE: 'REMOTE'
};

// Product status
export const PRODUCT_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
};

// Order status
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FULFILLING: 'FULFILLING',
  PARTIALLY_FULFILLED: 'PARTIALLY_FULFILLED',
  FULFILLED: 'FULFILLED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

// Pool/Key status
export const KEY_STATUS = {
  AVAILABLE: 'AVAILABLE',
  SOLD: 'SOLD',
  MAINTENANCE: 'MAINTENANCE',
  VOID: 'VOID'
};

// Delivery methods
export const DELIVERY_METHODS = {
  AUTO: 'AUTO',
  MANUAL: 'MANUAL'
};

// User roles
export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  ACCOUNTANT: 'ACCOUNTANT',
  WAREHOUSE: 'WAREHOUSE',
  CUSTOMER_SERVICE: 'CUSTOMER_SERVICE',
  AFFILIATE: 'AFFILIATE',
  CUSTOMER: 'CUSTOMER'
};

// Permissions
export const PERMISSIONS = {
  PRODUCTS_VIEW: 'products.view',
  PRODUCTS_CREATE: 'products.create',
  PRODUCTS_UPDATE: 'products.update',
  PRODUCTS_DELETE: 'products.delete',
  ORDERS_VIEW: 'orders.view',
  ORDERS_CREATE: 'orders.create',
  ORDERS_UPDATE: 'orders.update',
  ORDERS_CANCEL: 'orders.cancel',
  ORDERS_REFUND: 'orders.refund',
  CUSTOMERS_VIEW: 'customers.view',
  CUSTOMERS_VIEW_SENSITIVE: 'customers.view_sensitive',
  CUSTOMERS_UPDATE: 'customers.update',
  CUSTOMERS_BLOCK: 'customers.block',
  PAYMENTS_VIEW: 'payments.view',
  PAYMENTS_PROCESS: 'payments.process',
  PAYMENTS_REFUND: 'payments.refund',
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_UPDATE: 'settings.update',
  AFFILIATE_VIEW: 'affiliate.view',
  AFFILIATE_APPROVE: 'affiliate.approve',
  AFFILIATE_PAYOUT: 'affiliate.payout',
  AUDIT_VIEW: 'audit.view',
  USERS_VIEW: 'users.view',
  USERS_MANAGE: 'users.manage',
  ROLES_MANAGE: 'roles.manage'
};

// Transaction types
export const TRANSACTION_TYPES = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
  ORDER_PAYMENT: 'ORDER_PAYMENT',
  ORDER_REFUND: 'ORDER_REFUND',
  AFFILIATE_COMMISSION: 'AFFILIATE_COMMISSION',
  AFFILIATE_PAYOUT: 'AFFILIATE_PAYOUT',
  ADMIN_ADJUSTMENT: 'ADMIN_ADJUSTMENT'
};

// Discount types
export const DISCOUNT_TYPES = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT'
};

// Audit action types
export const AUDIT_ACTIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
  REFUND: 'REFUND',
  BLOCK: 'BLOCK',
  UNBLOCK: 'UNBLOCK'
};

// Currency
export const CURRENCY = {
  CODE: 'VND',
  SYMBOL: '₫',
  DECIMAL_PLACES: 0
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100
};

// Validation rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  SLUG_PATTERN: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
};

// Cache TTL (milliseconds)
export const CACHE_TTL = {
  SHORT: 5 * 60 * 1000,
  MEDIUM: 30 * 60 * 1000,
  LONG: 60 * 60 * 1000,
  VERY_LONG: 24 * 60 * 60 * 1000
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'mecwish_auth_token',
  REFRESH_TOKEN: 'mecwish_refresh_token',
  USER_DATA: 'mecwish_user_data',
  SETTINGS: 'mecwish_settings',
  CART: 'mecwish_cart',
  THEME: 'mecwish_theme'
};

// IndexedDB config
export const INDEXEDDB_CONFIG = {
  DB_NAME: 'mecwish_db',
  DB_VERSION: 1,
  STORES: {
    USERS: 'users',
    PRODUCTS: 'products',
    ORDERS: 'orders',
    CUSTOMERS: 'customers',
    PAYMENTS: 'payments',
    DISCOUNTS: 'discounts',
    POOLS: 'pools',
    TRANSACTIONS: 'transactions',
    AFFILIATES: 'affiliates',
    SETTINGS: 'settings',
    AUDIT_LOGS: 'audit_logs',
    COLLECTIONS: 'collections'
  }
};

// System defaults
export const DEFAULTS = {
  ADMIN_EMAIL: 'admin@mecwish.com',
  ADMIN_PASSWORD: 'admin123',
  SESSION_TIMEOUT: 3600000,
  AUTO_LOGOUT_WARNING: 300000
};

export default {
  DB_MODES,
  PRODUCT_STATUS,
  ORDER_STATUS,
  PAYMENT_STATUS,
  KEY_STATUS,
  DELIVERY_METHODS,
  USER_ROLES,
  PERMISSIONS,
  TRANSACTION_TYPES,
  DISCOUNT_TYPES,
  AUDIT_ACTIONS,
  CURRENCY,
  PAGINATION,
  VALIDATION,
  CACHE_TTL,
  STORAGE_KEYS,
  INDEXEDDB_CONFIG,
  DEFAULTS
};