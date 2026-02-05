/**
 * eventTypes.js - System-wide event type definitions
 * Định nghĩa tất cả các event types trong hệ thống
 */

// ============================================================================
// CORE SYSTEM EVENTS
// ============================================================================
export const CORE_EVENTS = {
  APP_READY: 'app:ready',
  APP_ERROR: 'app:error',
  APP_SHUTDOWN: 'app:shutdown',
  MODULE_LOADED: 'module:loaded',
  MODULE_ERROR: 'module:error'
};

// ============================================================================
// AUTHENTICATION & AUTHORIZATION EVENTS
// ============================================================================
export const AUTH_EVENTS = {
  LOGIN_SUCCESS: 'auth:login:success',
  LOGIN_FAILED: 'auth:login:failed',
  LOGOUT: 'auth:logout',
  SESSION_EXPIRED: 'auth:session:expired',
  TOKEN_REFRESHED: 'auth:token:refreshed',
  UNAUTHORIZED: 'auth:unauthorized',
  PERMISSION_DENIED: 'auth:permission:denied'
};

// ============================================================================
// ROUTING EVENTS
// ============================================================================
export const ROUTE_EVENTS = {
  BEFORE_CHANGE: 'route:before:change',
  CHANGE: 'route:change',
  AFTER_CHANGE: 'route:after:change',
  NOT_FOUND: 'route:not:found'
};

// ============================================================================
// PRODUCT EVENTS
// ============================================================================
export const PRODUCT_EVENTS = {
  CREATED: 'product:created',
  UPDATED: 'product:updated',
  DELETED: 'product:deleted',
  STATUS_CHANGED: 'product:status:changed',
  SLUG_GENERATED: 'product:slug:generated',
  ARCHIVED: 'product:archived',
  VARIANT_ADDED: 'product:variant:added',
  VARIANT_UPDATED: 'product:variant:updated',
  VARIANT_DELETED: 'product:variant:deleted'
};

// ============================================================================
// ORDER EVENTS
// ============================================================================
export const ORDER_EVENTS = {
  CREATED: 'order:created',
  UPDATED: 'order:updated',
  CANCELLED: 'order:cancelled',
  PAID: 'order:paid',
  FULFILLING: 'order:fulfilling',
  PARTIALLY_FULFILLED: 'order:partially:fulfilled',
  FULFILLED: 'order:fulfilled',
  REFUNDED: 'order:refunded',
  REFUND_REQUESTED: 'order:refund:requested',
  NOTE_ADDED: 'order:note:added'
};

// ============================================================================
// PAYMENT EVENTS
// ============================================================================
export const PAYMENT_EVENTS = {
  INITIATED: 'payment:initiated',
  PROCESSING: 'payment:processing',
  SUCCESS: 'payment:success',
  FAILED: 'payment:failed',
  REFUNDED: 'payment:refunded',
  WEBHOOK_RECEIVED: 'payment:webhook:received',
  METHOD_ADDED: 'payment:method:added'
};

// ============================================================================
// POOL/INVENTORY EVENTS
// ============================================================================
export const POOL_EVENTS = {
  KEY_IMPORTED: 'pool:key:imported',
  KEY_ALLOCATED: 'pool:key:allocated',
  KEY_SOLD: 'pool:key:sold',
  KEY_MAINTENANCE: 'pool:key:maintenance',
  KEY_VOID: 'pool:key:void',
  KEY_RECOVERED: 'pool:key:recovered',
  LOW_STOCK_WARNING: 'pool:low:stock',
  OUT_OF_STOCK: 'pool:out:of:stock',
  CIRCUIT_BREAKER_TRIGGERED: 'pool:circuit:breaker:triggered'
};

// ============================================================================
// CUSTOMER EVENTS
// ============================================================================
export const CUSTOMER_EVENTS = {
  CREATED: 'customer:created',
  UPDATED: 'customer:updated',
  BLOCKED: 'customer:blocked',
  UNBLOCKED: 'customer:unblocked',
  BALANCE_CHANGED: 'customer:balance:changed',
  TRANSACTION_CREATED: 'customer:transaction:created'
};

// ============================================================================
// AFFILIATE EVENTS
// ============================================================================
export const AFFILIATE_EVENTS = {
  REGISTERED: 'affiliate:registered',
  APPROVED: 'affiliate:approved',
  REJECTED: 'affiliate:rejected',
  COMMISSION_EARNED: 'affiliate:commission:earned',
  COMMISSION_REVOKED: 'affiliate:commission:revoked',
  PAYOUT_REQUESTED: 'affiliate:payout:requested',
  PAYOUT_COMPLETED: 'affiliate:payout:completed'
};

// ============================================================================
// DISCOUNT EVENTS
// ============================================================================
export const DISCOUNT_EVENTS = {
  CREATED: 'discount:created',
  UPDATED: 'discount:updated',
  DELETED: 'discount:deleted',
  APPLIED: 'discount:applied',
  EXPIRED: 'discount:expired',
  USAGE_LIMIT_REACHED: 'discount:usage:limit:reached'
};

// ============================================================================
// NOTIFICATION EVENTS
// ============================================================================
export const NOTIFICATION_EVENTS = {
  SHOW: 'notification:show',
  HIDE: 'notification:hide',
  SUCCESS: 'notification:success',
  ERROR: 'notification:error',
  WARNING: 'notification:warning',
  INFO: 'notification:info'
};

// ============================================================================
// UI EVENTS
// ============================================================================
export const UI_EVENTS = {
  MODAL_OPEN: 'ui:modal:open',
  MODAL_CLOSE: 'ui:modal:close',
  LOADING_START: 'ui:loading:start',
  LOADING_END: 'ui:loading:end',
  SIDEBAR_TOGGLE: 'ui:sidebar:toggle',
  THEME_CHANGED: 'ui:theme:changed'
};

// ============================================================================
// DATA EVENTS
// ============================================================================
export const DATA_EVENTS = {
  FETCH_START: 'data:fetch:start',
  FETCH_SUCCESS: 'data:fetch:success',
  FETCH_ERROR: 'data:fetch:error',
  CREATE_SUCCESS: 'data:create:success',
  UPDATE_SUCCESS: 'data:update:success',
  DELETE_SUCCESS: 'data:delete:success',
  CACHE_HIT: 'data:cache:hit',
  CACHE_MISS: 'data:cache:miss',
  CACHE_CLEARED: 'data:cache:cleared'
};

// ============================================================================
// AUDIT EVENTS
// ============================================================================
export const AUDIT_EVENTS = {
  ACTION_LOGGED: 'audit:action:logged',
  SENSITIVE_DATA_ACCESSED: 'audit:sensitive:data:accessed',
  PERMISSION_CHECK: 'audit:permission:check'
};

// ============================================================================
// ERROR EVENTS
// ============================================================================
export const ERROR_EVENTS = {
  VALIDATION_ERROR: 'error:validation',
  NETWORK_ERROR: 'error:network',
  DATABASE_ERROR: 'error:database',
  PERMISSION_ERROR: 'error:permission',
  NOT_FOUND_ERROR: 'error:not:found',
  CONFLICT_ERROR: 'error:conflict',
  UNEXPECTED_ERROR: 'error:unexpected'
};

// ============================================================================
// EXPORT ALL
// ============================================================================
export default {
  CORE_EVENTS,
  AUTH_EVENTS,
  ROUTE_EVENTS,
  PRODUCT_EVENTS,
  ORDER_EVENTS,
  PAYMENT_EVENTS,
  POOL_EVENTS,
  CUSTOMER_EVENTS,
  AFFILIATE_EVENTS,
  DISCOUNT_EVENTS,
  NOTIFICATION_EVENTS,
  UI_EVENTS,
  DATA_EVENTS,
  AUDIT_EVENTS,
  ERROR_EVENTS
};
