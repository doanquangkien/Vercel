/**
 * LifecycleManager.js - Quản lý lifecycle của application
 */

class LifecycleManager {
  constructor() {
    this.hooks = {
      beforeInit: [],
      afterInit: [],
      beforeDestroy: [],
      afterDestroy: []
    };
  }

  async init() {
    console.log('[LifecycleManager] Initialized');
  }

  /**
   * Register lifecycle hook
   */
  on(hookName, callback) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].push(callback);
    }
  }

  /**
   * Execute hooks
   */
  async execute(hookName, context = {}) {
    const hooks = this.hooks[hookName] || [];
    
    for (const hook of hooks) {
      try {
        await hook(context);
      } catch (err) {
        console.error(`[LifecycleManager] Hook error (${hookName}):`, err);
      }
    }
  }
}

export default LifecycleManager;
