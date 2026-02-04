import Kernel from './core/kernel/Kernel.js';
import EventBus from './core/events/EventBus.js';
import AuthManager from './core/security/AuthManager.js';

// Khởi tạo Alpine.js global data
document.addEventListener('alpine:init', () => {
  
  // Admin App Component
  Alpine.data('adminApp', () => ({
    // State
    isAuthenticated: false,
    user: null,
    currentRoute: '/',
    isLoggingIn: false,
    loginError: '',
    loginForm: {
      email: 'admin@mecwish.com',
      password: 'admin123'
    },

    // Lifecycle
    async init() {
      console.log('[App] Initializing...');
      
      // Boot kernel
      await Kernel.boot({
        debug: true,
        database: {
          mode: 'indexeddb',
          dbName: 'mecwish_db'
        }
      });

      // Initialize auth
      window.authManager = new AuthManager(EventBus);
      
      // Check if already logged in
      if (window.authManager.isAuthenticated()) {
        this.isAuthenticated = true;
        this.user = window.authManager.getUser();
        this.initRouting();
      }

      // Listen to auth events
      EventBus.on('AUTH:LOGIN_SUCCESS', (user) => {
        this.isAuthenticated = true;
        this.user = user;
        this.loginError = '';
        this.initRouting();
      });

      EventBus.on('AUTH:LOGOUT', () => {
        this.isAuthenticated = false;
        this.user = null;
        this.currentRoute = '/';
      });

      EventBus.on('ROUTER:NAVIGATED', ({ path }) => {
        this.currentRoute = path;
      });

      console.log('[App] Initialized');
    },

    // Methods
    async handleLogin() {
      this.isLoggingIn = true;
      this.loginError = '';

      try {
        const result = await window.authManager.login(this.loginForm);
        
        if (!result.success) {
          this.loginError = result.error || 'Đăng nhập thất bại';
        }
      } catch (err) {
        console.error('[Login] Error:', err);
        this.loginError = 'Có lỗi xảy ra, vui lòng thử lại';
      } finally {
        this.isLoggingIn = false;
      }
    },

    handleLogout() {
      if (confirm('Bạn có chắc muốn đăng xuất?')) {
        window.authManager.logout();
      }
    },

    initRouting() {
      // Register routes
      Kernel.router.register('/', async () => {
        await this.loadDashboard();
      });

      Kernel.router.register('/products', async () => {
        await this.loadProducts();
      });

      Kernel.router.register('/orders', async () => {
        await this.loadOrders();
      });

      Kernel.router.register('/customers', async () => {
        await this.loadCustomers();
      });

      Kernel.router.register('/pools', async () => {
        await this.loadPools();
      });

      Kernel.router.register('/settings', async () => {
        await this.loadSettings();
      });

      // Add auth guard
      Kernel.router.addGuard(async (path) => {
        if (!window.authManager.isAuthenticated()) {
          console.warn('[Guard] Blocked:', path);
          return false;
        }
        return true;
      });

      // Trigger initial route
      Kernel.router.handleRoute();
    },

    async loadDashboard() {
      console.log('[Router] Loading Dashboard...');
      const content = document.getElementById('app-content');
      content.innerHTML = `
        <div>
          <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
          <p class="text-secondary mb-6">Tổng quan hệ thống MECWISH</p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="card card-soft">
              <div class="card-body">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-secondary">Tổng đơn hàng</span>
                  <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <div class="text-3xl font-bold">0</div>
                <div class="text-xs text-green-600 mt-1">+0% so với tháng trước</div>
              </div>
            </div>

            <div class="card card-soft">
              <div class="card-body">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-secondary">Sản phẩm</span>
                  <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <div class="text-3xl font-bold">0</div>
                <div class="text-xs text-secondary mt-1">0 đang bán</div>
              </div>
            </div>

            <div class="card card-soft">
              <div class="card-body">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-secondary">Khách hàng</span>
                  <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div class="text-3xl font-bold">0</div>
                <div class="text-xs text-green-600 mt-1">+0 hôm nay</div>
              </div>
            </div>

            <div class="card card-soft">
              <div class="card-body">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-secondary">Doanh thu</span>
                  <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="text-3xl font-bold">0đ</div>
                <div class="text-xs text-secondary mt-1">Tháng này</div>
              </div>
            </div>
          </div>

          <div class="card card-soft">
            <div class="card-body">
              <h3 class="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
              <div class="text-center py-8 text-secondary">
                <p>Chưa có hoạt động nào</p>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    async loadProducts() {
      console.log('[Router] Loading Products...');
      const content = document.getElementById('app-content');
      content.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-3xl font-bold mb-2">Sản phẩm</h1>
              <p class="text-secondary">Quản lý sản phẩm số của bạn</p>
            </div>
            <button class="btn btn-primary">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Thêm sản phẩm
            </button>
          </div>

          <div class="card card-soft">
            <div class="card-body">
              <div class="text-center py-12 text-secondary">
                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <p class="text-lg mb-2">Chưa có sản phẩm nào</p>
                <p class="text-sm">Bắt đầu thêm sản phẩm đầu tiên của bạn</p>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    async loadOrders() {
      console.log('[Router] Loading Orders...');
      const content = document.getElementById('app-content');
      content.innerHTML = `
        <div>
          <h1 class="text-3xl font-bold mb-2">Đơn hàng</h1>
          <p class="text-secondary mb-6">Quản lý đơn hàng và fulfillment</p>
          <div class="card card-soft">
            <div class="card-body text-center py-12 text-secondary">
              <p>Module Đơn hàng đang được phát triển...</p>
            </div>
          </div>
        </div>
      `;
    },

    async loadCustomers() {
      console.log('[Router] Loading Customers...');
      const content = document.getElementById('app-content');
      content.innerHTML = `
        <div>
          <h1 class="text-3xl font-bold mb-2">Khách hàng</h1>
          <p class="text-secondary mb-6">Quản lý khách hàng và CRM</p>
          <div class="card card-soft">
            <div class="card-body text-center py-12 text-secondary">
              <p>Module Khách hàng đang được phát triển...</p>
            </div>
          </div>
        </div>
      `;
    },

    async loadPools() {
      console.log('[Router] Loading Pools...');
      const content = document.getElementById('app-content');
      content.innerHTML = `
        <div>
          <h1 class="text-3xl font-bold mb-2">Kho Key</h1>
          <p class="text-secondary mb-6">Quản lý kho sản phẩm số</p>
          <div class="card card-soft">
            <div class="card-body text-center py-12 text-secondary">
              <p>Module Kho Key đang được phát triển...</p>
            </div>
          </div>
        </div>
      `;
    },

    async loadSettings() {
      console.log('[Router] Loading Settings...');
      const content = document.getElementById('app-content');
      content.innerHTML = `
        <div>
          <h1 class="text-3xl font-bold mb-2">Cài đặt</h1>
          <p class="text-secondary mb-6">Cấu hình hệ thống</p>
          <div class="card card-soft">
            <div class="card-body text-center py-12 text-secondary">
              <p>Module Cài đặt đang được phát triển...</p>
            </div>
          </div>
        </div>
      `;
    }
  }));

});

// Export global App reference
window.App = {
  kernel: Kernel,
  eventBus: EventBus
};

console.log('[MECWISH] Application loaded');
