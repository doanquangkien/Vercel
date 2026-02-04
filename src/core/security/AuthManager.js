/**
 * AuthManager.js - Authentication & Session Management
 */

import DatabaseAdapter from '../data/DatabaseAdapter.js';

class AuthManager {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.currentUser = null;
    this.sessionKey = 'mecwish_session';
  }

  /**
   * Login user
   */
  async login({ email, password }) {
    try {
      console.log(`[Auth] Login attempt: ${email}`);

      // Initialize database if not ready
      if (!DatabaseAdapter.isReady) {
        await DatabaseAdapter.init({
          mode: 'indexeddb',
          dbName: 'mecwish_db',
          version: 1
        });
      }

      // Get user by email
      const users = await DatabaseAdapter.query('users', { email });

      if (users.length === 0) {
        // First time - create default admin
        if (email === 'admin@mecwish.com' && password === 'admin123') {
          const admin = await this.createDefaultAdmin();
          return this.createSession(admin);
        }

        return { success: false, error: 'Email không tồn tại' };
      }

      const user = users[0];

      // Validate password
      if (user.password !== password) {
        return { success: false, error: 'Mật khẩu không đúng' };
      }

      // Check if user is blocked
      if (user.status === 'blocked') {
        return { success: false, error: 'Tài khoản đã bị khóa' };
      }

      return this.createSession(user);

    } catch (err) {
      console.error('[Auth] Login error:', err);
      return { success: false, error: 'Đăng nhập thất bại' };
    }
  }

  /**
   * Create default admin user
   */
  async createDefaultAdmin() {
    const admin = {
      email: 'admin@mecwish.com',
      password: 'admin123',
      fullName: 'Admin User',
      role: 'admin',
      status: 'active',
      permissions: ['*']
    };

    const created = await DatabaseAdapter.add('users', admin);
    console.log('[Auth] Default admin created');
    return created;
  }

  /**
   * Create session
   */
  createSession(user) {
    // Remove password from user object
    const { password, ...safeUser } = user;

    this.currentUser = safeUser;

    // Save to localStorage
    localStorage.setItem(this.sessionKey, JSON.stringify({
      user: safeUser,
      timestamp: Date.now()
    }));

    // Emit event
    this.eventBus.emit('AUTH:LOGIN_SUCCESS', safeUser);

    console.log('[Auth] Login successful:', safeUser.email);

    return { success: true, user: safeUser };
  }

  /**
   * Logout
   */
  logout() {
    console.log('[Auth] Logout');

    this.currentUser = null;
    localStorage.removeItem(this.sessionKey);

    this.eventBus.emit('AUTH:LOGOUT');
  }

  /**
   * Check if authenticated
   */
  isAuthenticated() {
    if (this.currentUser) return true;

    // Check localStorage
    const session = localStorage.getItem(this.sessionKey);
    if (!session) return false;

    try {
      const { user, timestamp } = JSON.parse(session);

      // Check if session expired (24 hours)
      const now = Date.now();
      const elapsed = now - timestamp;
      const maxAge = 24 * 60 * 60 * 1000;

      if (elapsed > maxAge) {
        this.logout();
        return false;
      }

      this.currentUser = user;
      return true;

    } catch (err) {
      console.error('[Auth] Session parse error:', err);
      return false;
    }
  }

  /**
   * Get current user
   */
  getUser() {
    if (!this.isAuthenticated()) return null;
    return this.currentUser;
  }

  /**
   * Check permission
   */
  hasPermission(permission) {
    const user = this.getUser();
    if (!user) return false;

    // Admin has all permissions
    if (user.role === 'admin' || user.permissions?.includes('*')) {
      return true;
    }

    // Check user permissions
    return user.permissions?.includes(permission) || false;
  }

  /**
   * Update session
   */
  updateSession(userData) {
    const { password, ...safeData } = userData;
    
    this.currentUser = {
      ...this.currentUser,
      ...safeData
    };

    localStorage.setItem(this.sessionKey, JSON.stringify({
      user: this.currentUser,
      timestamp: Date.now()
    }));

    this.eventBus.emit('AUTH:SESSION_UPDATED', this.currentUser);
  }
}

export default AuthManager;
