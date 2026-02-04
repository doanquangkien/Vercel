/**
 * Router.js - Client-side Hash-based Router
 * 
 * Nhiệm vụ:
 * 1. Hash-based routing (#/products, #/orders)
 * 2. Route guards (authentication check)
 * 3. History management
 * 4. Dynamic route params (#/products/:id)
 */

class Router {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.routes = new Map();
    this.guards = [];
    this.currentPath = '/';
    this.params = {};
  }

  async init() {
    console.log('[Router] Initializing...');

    // Listen to hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());

    console.log('[Router] Initialized');
  }

  /**
   * Register a route
   */
  register(path, handler) {
    this.routes.set(path, handler);
    
    if (window.App?.kernel?.config?.debug) {
      console.log(`[Router] Registered route: ${path}`);
    }
  }

  /**
   * Add route guard (middleware)
   */
  addGuard(guardFn) {
    this.guards.push(guardFn);
  }

  /**
   * Navigate to path
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Handle current route
   */
  async handleRoute() {
    // Get path from hash
    let path = window.location.hash.slice(1) || '/';
    
    // Remove trailing slash (except root)
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    console.log(`[Router] Navigating to: ${path}`);

    // Run guards
    for (const guard of this.guards) {
      const canProceed = await guard(path);
      if (!canProceed) {
        console.warn(`[Router] Guard blocked: ${path}`);
        return;
      }
    }

    // Match route
    const { handler, params } = this.matchRoute(path);

    if (!handler) {
      console.warn(`[Router] No handler for: ${path}`);
      this.handle404(path);
      return;
    }

    // Update state
    this.currentPath = path;
    this.params = params;

    // Execute handler
    try {
      await handler(params);
      this.eventBus.emit('ROUTER:NAVIGATED', { path, params });
    } catch (err) {
      console.error(`[Router] Handler error:`, err);
      this.handle500(err);
    }
  }

  /**
   * Match route with params
   */
  matchRoute(path) {
    // Exact match first
    if (this.routes.has(path)) {
      return { handler: this.routes.get(path), params: {} };
    }

    // Dynamic match (e.g., /products/:id)
    for (const [routePath, handler] of this.routes) {
      const params = this.extractParams(routePath, path);
      if (params) {
        return { handler, params };
      }
    }

    return { handler: null, params: {} };
  }

  /**
   * Extract params from dynamic routes
   */
  extractParams(routePath, actualPath) {
    const routeParts = routePath.split('/');
    const actualParts = actualPath.split('/');

    if (routeParts.length !== actualParts.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const actualPart = actualParts[i];

      if (routePart.startsWith(':')) {
        // Dynamic segment
        const paramName = routePart.slice(1);
        params[paramName] = actualPart;
      } else if (routePart !== actualPart) {
        // Static segment doesn't match
        return null;
      }
    }

    return params;
  }

  /**
   * 404 Handler
   */
  handle404(path) {
    console.error(`[Router] 404 Not Found: ${path}`);
    this.eventBus.emit('ROUTER:404', { path });
  }

  /**
   * 500 Handler
   */
  handle500(error) {
    console.error(`[Router] 500 Server Error:`, error);
    this.eventBus.emit('ROUTER:ERROR', { error });
  }

  /**
   * Get current route info
   */
  getCurrent() {
    return {
      path: this.currentPath,
      params: this.params
    };
  }
}

export default Router;
