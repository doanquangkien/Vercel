/**
 * schema.js - IndexedDB Schema Definition
 * Định nghĩa cấu trúc database cho toàn hệ thống
 */

export const DATABASE_SCHEMA = {
  version: 1,
  
  stores: {
    // Users store
    users: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'email', keyPath: 'email', unique: true },
        { name: 'role', keyPath: 'role', unique: false },
        { name: 'status', keyPath: 'status', unique: false }
      ]
    },

    // Products store
    products: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'slug', keyPath: 'slug', unique: true },
        { name: 'status', keyPath: 'status', unique: false },
        { name: 'createdAt', keyPath: 'createdAt', unique: false }
      ]
    },

    // Orders store
    orders: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'customerId', keyPath: 'customerId', unique: false },
        { name: 'status', keyPath: 'status', unique: false },
        { name: 'createdAt', keyPath: 'createdAt', unique: false },
        { name: 'total', keyPath: 'total', unique: false }
      ]
    },

    // Customers store
    customers: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'email', keyPath: 'email', unique: true },
        { name: 'phone', keyPath: 'phone', unique: false },
        { name: 'status', keyPath: 'status', unique: false },
        { name: 'balance', keyPath: 'balance', unique: false }
      ]
    },

    // Payments store
    payments: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'orderId', keyPath: 'orderId', unique: false },
        { name: 'customerId', keyPath: 'customerId', unique: false },
        { name: 'status', keyPath: 'status', unique: false },
        { name: 'method', keyPath: 'method', unique: false },
        { name: 'createdAt', keyPath: 'createdAt', unique: false }
      ]
    },

    // Discounts store
    discounts: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'code', keyPath: 'code', unique: true },
        { name: 'status', keyPath: 'status', unique: false },
        { name: 'validFrom', keyPath: 'validFrom', unique: false },
        { name: 'validTo', keyPath: 'validTo', unique: false }
      ]
    },

    // Pools (Key management) store
    pools: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'productId', keyPath: 'productId', unique: false },
        { name: 'variantId', keyPath: 'variantId', unique: false },
        { name: 'status', keyPath: 'status', unique: false },
        { name: 'key', keyPath: 'key', unique: true },
        { name: 'orderId', keyPath: 'orderId', unique: false }
      ]
    },

    // Transactions store
    transactions: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'customerId', keyPath: 'customerId', unique: false },
        { name: 'type', keyPath: 'type', unique: false },
        { name: 'orderId', keyPath: 'orderId', unique: false },
        { name: 'createdAt', keyPath: 'createdAt', unique: false }
      ]
    },

    // Affiliates store
    affiliates: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'userId', keyPath: 'userId', unique: true },
        { name: 'status', keyPath: 'status', unique: false },
        { name: 'code', keyPath: 'code', unique: true },
        { name: 'totalEarnings', keyPath: 'totalEarnings', unique: false }
      ]
    },

    // Settings store
    settings: {
      keyPath: 'key',
      autoIncrement: false,
      indexes: [
        { name: 'category', keyPath: 'category', unique: false }
      ]
    },

    // Audit logs store
    audit_logs: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'userId', keyPath: 'userId', unique: false },
        { name: 'action', keyPath: 'action', unique: false },
        { name: 'resource', keyPath: 'resource', unique: false },
        { name: 'createdAt', keyPath: 'createdAt', unique: false }
      ]
    },

    // Collections store
    collections: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'slug', keyPath: 'slug', unique: true },
        { name: 'status', keyPath: 'status', unique: false }
      ]
    }
  }
};

/**
 * Get initial data for stores
 */
export function getInitialData() {
  return {
    users: [
      {
        id: 'user_admin',
        email: 'admin@mecwish.com',
        password: '$2a$10$rS8v9.hashexample', // Will be hashed properly
        name: 'Admin',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    settings: [
      {
        key: 'site_name',
        value: 'MECWISH',
        category: 'general'
      },
      {
        key: 'currency',
        value: 'VND',
        category: 'general'
      },
      {
        key: 'default_auto_limit',
        value: 5,
        category: 'products'
      }
    ]
  };
}

export default DATABASE_SCHEMA;

