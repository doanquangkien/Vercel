import { USER_ROLES, PERMISSIONS } from '../config/constants.js';

class PermissionGuard {
  constructor() {
    this.rolePermissions = this.initializeRolePermissions();
  }

  initializeRolePermissions() {
    return {
      [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
      [USER_ROLES.ADMIN]: Object.values(PERMISSIONS).filter(p => 
        !p.includes('roles.manage')
      ),
      [USER_ROLES.STAFF]: [
        PERMISSIONS.PRODUCTS_VIEW,
        PERMISSIONS.ORDERS_VIEW,
        PERMISSIONS.CUSTOMERS_VIEW
      ],
      [USER_ROLES.ACCOUNTANT]: [
        PERMISSIONS.PAYMENTS_VIEW,
        PERMISSIONS.ORDERS_VIEW
      ],
      [USER_ROLES.WAREHOUSE]: [
        PERMISSIONS.PRODUCTS_VIEW,
        PERMISSIONS.PRODUCTS_UPDATE
      ],
      [USER_ROLES.CUSTOMER_SERVICE]: [
        PERMISSIONS.CUSTOMERS_VIEW,
        PERMISSIONS.ORDERS_VIEW
      ],
      [USER_ROLES.AFFILIATE]: [
        PERMISSIONS.AFFILIATE_VIEW
      ],
      [USER_ROLES.CUSTOMER]: []
    };
  }

  can(user, permission) {
    if (!user || !user.role) return false;
    
    const permissions = this.rolePermissions[user.role] || [];
    return permissions.includes(permission);
  }

  canAny(user, permissions) {
    return permissions.some(permission => this.can(user, permission));
  }

  canAll(user, permissions) {
    return permissions.every(permission => this.can(user, permission));
  }

  hasRole(user, role) {
    return user?.role === role;
  }

  isSuperAdmin(user) {
    return this.hasRole(user, USER_ROLES.SUPER_ADMIN);
  }

  isAdmin(user) {
    return this.hasRole(user, USER_ROLES.ADMIN) || this.isSuperAdmin(user);
  }

  getPermissions(role) {
    return this.rolePermissions[role] || [];
  }
}

export const permissionGuard = new PermissionGuard();
export default permissionGuard;