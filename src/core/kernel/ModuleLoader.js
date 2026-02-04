/**
 * ModuleLoader.js - Dynamic module loading
 */

class ModuleLoader {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.loadedModules = new Map();
  }

  async init() {
    console.log('[ModuleLoader] Initialized');
  }

  /**
   * Load module dynamically
   */
  async load(moduleName, modulePath) {
    try {
      console.log(`[ModuleLoader] Loading: ${moduleName}`);
      
      const module = await import(modulePath);
      this.loadedModules.set(moduleName, module);
      
      this.eventBus.emit('MODULE:LOADED', { name: moduleName });
      
      return module;
    } catch (err) {
      console.error(`[ModuleLoader] Failed to load ${moduleName}:`, err);
      throw err;
    }
  }

  /**
   * Get loaded module
   */
  get(moduleName) {
    return this.loadedModules.get(moduleName);
  }

  /**
   * Check if module is loaded
   */
  has(moduleName) {
    return this.loadedModules.has(moduleName);
  }
}

export default ModuleLoader;
