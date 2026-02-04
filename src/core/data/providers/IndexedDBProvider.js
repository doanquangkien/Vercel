/**
 * IndexedDBProvider.js - IndexedDB Implementation
 */

class IndexedDBProvider {
  constructor(dbName, version) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        this.createSchema();
      };
    });
  }

  createSchema() {
    console.log('[IndexedDB] Creating schema...');

    // Users
    if (!this.db.objectStoreNames.contains('users')) {
      const usersStore = this.db.createObjectStore('users', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      usersStore.createIndex('email', 'email', { unique: true });
      usersStore.createIndex('role', 'role', { unique: false });
    }

    // Products
    if (!this.db.objectStoreNames.contains('products')) {
      const productsStore = this.db.createObjectStore('products', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      productsStore.createIndex('slug', 'slug', { unique: true });
      productsStore.createIndex('status', 'status', { unique: false });
    }

    // Orders
    if (!this.db.objectStoreNames.contains('orders')) {
      const ordersStore = this.db.createObjectStore('orders', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      ordersStore.createIndex('customerId', 'customerId', { unique: false });
      ordersStore.createIndex('status', 'status', { unique: false });
    }

    // Customers
    if (!this.db.objectStoreNames.contains('customers')) {
      const customersStore = this.db.createObjectStore('customers', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      customersStore.createIndex('email', 'email', { unique: true });
    }

    // Pools (Key Storage)
    if (!this.db.objectStoreNames.contains('pools')) {
      const poolsStore = this.db.createObjectStore('pools', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      poolsStore.createIndex('productId', 'productId', { unique: false });
      poolsStore.createIndex('status', 'status', { unique: false });
    }

    // Settings
    if (!this.db.objectStoreNames.contains('settings')) {
      this.db.createObjectStore('settings', { 
        keyPath: 'key' 
      });
    }

    // Audit Logs
    if (!this.db.objectStoreNames.contains('audit_logs')) {
      const auditStore = this.db.createObjectStore('audit_logs', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      auditStore.createIndex('userId', 'userId', { unique: false });
      auditStore.createIndex('action', 'action', { unique: false });
    }

    console.log('[IndexedDB] Schema created');
  }

  async getAll(table) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(table, 'readonly');
      const store = transaction.objectStore(table);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getById(table, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(table, 'readonly');
      const store = transaction.objectStore(table);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async add(table, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(table, 'readwrite');
      const store = transaction.objectStore(table);
      
      // Add timestamps
      const record = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const request = store.add(record);

      request.onsuccess = async () => {
        const id = request.result;
        const added = await this.getById(table, id);
        resolve(added);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async update(table, id, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(table, 'readwrite');
      const store = transaction.objectStore(table);
      
      // Get existing record
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const existing = getRequest.result;
        
        if (!existing) {
          reject(new Error(`Record not found: ${id}`));
          return;
        }

        // Merge data
        const updated = {
          ...existing,
          ...data,
          id,
          updatedAt: new Date().toISOString()
        };

        const putRequest = store.put(updated);

        putRequest.onsuccess = () => resolve(updated);
        putRequest.onerror = () => reject(putRequest.error);
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async delete(table, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(table, 'readwrite');
      const store = transaction.objectStore(table);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async query(table, filters) {
    const all = await this.getAll(table);
    
    return all.filter(record => {
      for (const [key, value] of Object.entries(filters)) {
        if (record[key] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  async clear(table) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(table, 'readwrite');
      const store = transaction.objectStore(table);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export default IndexedDBProvider;
