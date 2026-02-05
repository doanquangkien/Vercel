import permissionGuard from '../../core/security/PermissionGuard.js';

export default {
  name: 'x-permission',
  
  mounted(el, binding) {
    const user = window.App?.auth?.getCurrentUser?.();
    const permission = binding.value;
    
    if (!permissionGuard.can(user, permission)) {
      el.style.display = 'none';
    }
  }
};