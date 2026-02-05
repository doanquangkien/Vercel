/**
 * DatabaseAdapter.js - Abstract Database Layer
 * 
 * Hỗ trợ:
 * - IndexedDB (default)
 * - LocalStorage (fallback)
 * - REST API (future)
 */

import EventBus from '../events/EventBus.js';
import IndexedDBProvider from './providers/IndexedDBProvider.js';
import LocalStorageProvider from './providers/LocalStorageProvider.js';

class DatabaseAdapter {
  constructor() {
    this.provider = null;
    this.mode = null;
    this.isReady = false;
  }

  /**
   * Initialize database
   */
  async init(config = {}) {
    const { mode = 'indexeddb', dbName = 'mecwish_db', version = 1 } = config;

    console.log(`[Database] Initializing (${mode})...`);

    this.mode = mode;

    try {
      // Select provider
      switch (mode) {
        case 'indexeddb':
          this.provider = new IndexedDBProvider(dbName, version);
          break;
        case 'localstorage':
          this.provider = new LocalStorageProvider(dbName);
          break;
        default:
          throw new Error(`Unknown database mode: ${mode}`);
      }

      // Initialize provider
      await this.provider.init();

      this.isReady = true;
      EventBus.emit('DATABASE:READY', { mode });
      
      console.log(`[Database] Ready (${mode})`);
    } catch (err) {
      console.error('[Database] Init failed:', err);
      throw err;
    }
  }

  /**
   * Get all records from table
   */
  async getAll(table) {
    this._ensureReady();
    return await this.provider.getAll(table);
  }

  /**
   * Get record by ID
   */
  async getById(table, id) {
    this._ensureReady();
    return await this.provider.getById(table, id);
  }

  /**
   * Add record
   */
  async add(table, data) {
    this._ensureReady();
    const result = await this.provider.add(table, data);
    EventBus.emit(`DATABASE:${table.toUpperCase()}:ADDED`, { data: result });
    return result;
  }

  /**
   * Update record
   */
  async update(table, id, data) {
    this._ensureReady();
    const result = await this.provider.update(table, id, data);
    EventBus.emit(`DATABASE:${table.toUpperCase()}:UPDATED`, { id, data: result });
    return result;
  }

  /**
   * Delete record
   */
  async delete(table, id) {
    this._ensureReady();
    await this.provider.delete(table, id);
    EventBus.emit(`DATABASE:${table.toUpperCase()}:DELETED`, { id });
  }

  /**
   * Query with filters
   */
  async query(table, filters = {}) {
    this._ensureReady();
    return await this.provider.query(table, filters);
  }

  /**
   * Clear table
   */
  async clear(table) {
    this._ensureReady();
    await this.provider.clear(table);
    EventBus.emit(`DATABASE:${table.toUpperCase()}:CLEARED`);
  }

  /**
   * Ensure database is ready
   */
  _ensureReady() {
    if (!this.isReady) {
      throw new Error('Database not initialized. Call init() first.');
    }
  }
}

export default new DatabaseAdapter();