/**
 * logger.js - Logging utility
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

class Logger {
  constructor() {
    this.level = LOG_LEVELS.DEBUG;
    this.prefix = '[MECWISH]';
  }

  setLevel(level) {
    this.level = LOG_LEVELS[level.toUpperCase()] || LOG_LEVELS.DEBUG;
  }

  debug(...args) {
    if (this.level <= LOG_LEVELS.DEBUG) {
      console.log(`${this.prefix} [DEBUG]`, ...args);
    }
  }

  info(...args) {
    if (this.level <= LOG_LEVELS.INFO) {
      console.log(`${this.prefix} [INFO]`, ...args);
    }
  }

  warn(...args) {
    if (this.level <= LOG_LEVELS.WARN) {
      console.warn(`${this.prefix} [WARN]`, ...args);
    }
  }

  error(...args) {
    if (this.level <= LOG_LEVELS.ERROR) {
      console.error(`${this.prefix} [ERROR]`, ...args);
    }
  }
}

export default new Logger();
