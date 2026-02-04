/**
 * Core Module Exports
 */

// Kernel & System
export { default as Kernel } from './kernel/Kernel.js';
export { default as Router } from './kernel/Router.js';
export { default as EventBus } from './events/EventBus.js';

// Database
export { default as DatabaseAdapter } from './data/DatabaseAdapter.js';

// Security
export { default as AuthManager } from './security/AuthManager.js';

// UI
export { default as UISystem } from './ui/UISystem.js';

// Utils
export { default as Logger } from './utils/logger.js';
export * as Format from './utils/format.js';
export * as Validate from './utils/validate.js';
export * as Debounce from './utils/debounce.js';

console.log('[Core] Modules exported');
