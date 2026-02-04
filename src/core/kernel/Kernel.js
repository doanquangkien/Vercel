/**
 * Kernel.js - System Bootstrap & Module Loader
 * 
 * Nhiệm vụ:
 * 1. Khởi tạo hệ thống (boot sequence)
 * 2. Load & register modules
 * 3. Quản lý lifecycle (init, start, stop)
 * 4. Expose global APIs
 */

import EventBus from '../events/EventBus.js';
import Router from './Router.js';
import LifecycleManager from './LifecycleManager.js';
import ModuleLoader from './ModuleLoader.js';

class Kernel {
  constructor() {
    this.isBooted = false;
    this.config = null;
    this.modules = new Map();
    this.router = null;
    this.lifecycle = null;
    this.moduleLoader = null;
  }

  /**
   * Boot hệ thống với config
   */
  async boot(config = {}) {
    if (this.isBooted) {
      console.warn('[Kernel] Already booted');
      return;
    }

    console.log('[Kernel] Booting system...');

    // Merge config
    this.config = {
      debug: false,
      database: {
        mode: 'indexeddb',
        dbName: 'mecwish_db',
        version: 1
      },
      ...config
    };

    // Set debug mode
    if (this.config.debug) {
      EventBus.setDebug(true);
      console.log('[Kernel] Debug mode enabled');
    }

    // Initialize core systems
    try {
      // 1. Lifecycle Manager
      this.lifecycle = new LifecycleManager();
      await this.lifecycle.init();

      // 2. Router
      this.router = new Router(EventBus);
      await this.router.init();

      // 3. Module Loader
      this.moduleLoader = new ModuleLoader(EventBus);
      await this.moduleLoader.init();
      
      this.isBooted = true;
      EventBus.emit('KERNEL:BOOTED', { config: this.config });
      
      console.log('[Kernel] System booted successfully');
    } catch (err) {
      console.error('[Kernel] Boot failed:', err);
      throw err;
    }
  }

  /**
   * Register a module
   */
  registerModule(name, module) {
    if (this.modules.has(name)) {
      console.warn(`[Kernel] Module "${name}" already registered`);
      return;
    }

    this.modules.set(name, module);
    
    if (this.config?.debug) {
      console.log(`[Kernel] Registered module: ${name}`);
    }

    EventBus.emit('KERNEL:MODULE_REGISTERED', { name, module });
  }

  /**
   * Get module by name
   */
  getModule(name) {
    return this.modules.get(name);
  }

  /**
   * Shutdown hệ thống
   */
  async shutdown() {
    console.log('[Kernel] Shutting down...');
    
    // Cleanup modules
    for (const [name, module] of this.modules) {
      if (module.destroy) {
        await module.destroy();
      }
    }

    // Reset state
    this.modules.clear();
    this.isBooted = false;

    EventBus.emit('KERNEL:SHUTDOWN');
    console.log('[Kernel] Shutdown complete');
  }
}

export default new Kernel();
