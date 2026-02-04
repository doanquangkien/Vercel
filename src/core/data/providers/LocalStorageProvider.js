/**
 * LocalStorageProvider.js - LocalStorage Fallback
 */

class LocalStorageProvider {
  constructor(dbName) {
    this.dbName = dbName;
    this.prefix = `${dbName}_`;
  }

  async init() {
    console.log('[LocalStorage] Initialized');
  }

  _getKey(table, id = null) {
    return id ? `${this.prefix}${table}_${id}` : `${this.prefix}${table}`;
  }

  _getTableIndex(table) {
    const key = this._getKey(table);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  _setTableIndex(table, index) {
    const key = this._getKey(table);
    localStorage.setItem(key, JSON.stringify(index));
  }

  async getAll(table) {
    return this._getTableIndex(table);
  }

  async getById(table, id) {
    const all = this._getTableIndex(table);
    return all.find(item => item.id === id) || null;
  }

  async add(table, data) {
    const all = this._getTableIndex(table);
    const id = all.length > 0 ? Math.max(...all.map(i => i.id)) + 1 : 1;
    
    const record = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    all.push(record);
    this._setTableIndex(table, all);
    
    return record;
  }

  async update(table, id, data) {
    const all = this._getTableIndex(table);
    const index = all.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Record not found: ${id}`);
    }

    const updated = {
      ...all[index],
      ...data,
      id,
      updatedAt: new Date().toISOString()
    };

    all[index] = updated;
    this._setTableIndex(table, all);
    
    return updated;
  }

  async delete(table, id) {
    const all = this._getTableIndex(table);
    const filtered = all.filter(item => item.id !== id);
    this._setTableIndex(table, filtered);
  }

  async query(table, filters) {
    const all = this._getTableIndex(table);
    
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
    this._setTableIndex(table, []);
  }
}

export default LocalStorageProvider;
