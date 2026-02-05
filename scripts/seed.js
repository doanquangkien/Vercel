/**
 * seed.js - Database seeding script
 * Tạo dữ liệu mẫu cho development
 */

import { DATABASE_SCHEMA, getInitialData } from '../src/core/data/schema.js';
import cryptoUtils from '../src/core/security/CryptoUtils.js';
import { PRODUCT_STATUS, ORDER_STATUS, KEY_STATUS } from '../src/core/config/constants.js';

console.log('🌱 MECWISH Database Seeding\n');
console.log('📝 NOTE: This script provides seed data structure.');
console.log('   Actual seeding happens automatically on first app launch.\n');

// Sample data structures
const sampleData = {
  users: [
    {
      id: 'user_admin',
      email: 'admin@mecwish.com',
      password: 'admin123', // Will be hashed in app
      name: 'Administrator',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    },
    {
      id: 'user_staff',
      email: 'staff@mecwish.com',
      password: 'staff123',
      name: 'Staff Member',
      role: 'STAFF',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    }
  ],

  products: [
    {
      id: cryptoUtils.generateId('prod'),
      name: 'Microsoft Office 365',
      slug: 'microsoft-office-365',
      description: 'Bản quyền Office 365 cho 1 năm',
      status: PRODUCT_STATUS.ACTIVE,
      basePrice: 1200000,
      comparePrice: 1500000,
      variants: [
        {
          id: cryptoUtils.generateId('var'),
          sku: 'OFF365-1Y',
          name: '1 Năm',
          price: 1200000,
          deliveryMethod: 'AUTO',
          autoSalesLimit: 5
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: cryptoUtils.generateId('prod'),
      name: 'Windows 11 Pro',
      slug: 'windows-11-pro',
      description: 'Bản quyền Windows 11 Pro vĩnh viễn',
      status: PRODUCT_STATUS.ACTIVE,
      basePrice: 800000,
      comparePrice: 1000000,
      variants: [
        {
          id: cryptoUtils.generateId('var'),
          sku: 'WIN11PRO',
          name: 'Lifetime',
          price: 800000,
          deliveryMethod: 'MANUAL',
          autoSalesLimit: 0
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  customers: [
    {
      id: cryptoUtils.generateId('cust'),
      email: 'customer@example.com',
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      balance: 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    }
  ],

  pools: [
    // Sample keys for Office 365
    ...Array.from({ length: 10 }, (_, i) => ({
      id: cryptoUtils.generateId('key'),
      productId: 'prod_office365', // Will be replaced with actual product ID
      variantId: 'var_office365_1y',
      key: `XXXXX-XXXXX-XXXXX-XXXXX-${String(i).padStart(5, '0')}`,
      status: KEY_STATUS.AVAILABLE,
      createdAt: new Date().toISOString()
    }))
  ],

  settings: [
    {
      key: 'site_name',
      value: 'MECWISH Store',
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
    },
    {
      key: 'enable_affiliate',
      value: true,
      category: 'features'
    },
    {
      key: 'commission_rate',
      value: 10,
      category: 'affiliate'
    }
  ]
};

console.log('📦 Sample Data Structure:\n');
console.log(`   Users: ${sampleData.users.length}`);
console.log(`   Products: ${sampleData.products.length}`);
console.log(`   Customers: ${sampleData.customers.length}`);
console.log(`   Keys: ${sampleData.pools.length}`);
console.log(`   Settings: ${sampleData.settings.length}\n`);

console.log('🚀 To seed the database:');
console.log('   1. Run: npm run dev');
console.log('   2. Open: http://localhost:3000/admin.html');
console.log('   3. Login with: admin@mecwish.com / admin123');
console.log('   4. Database will auto-seed on first login\n');

export { sampleData };
export default sampleData;
