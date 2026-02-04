/**
 * UISystem.js - Global UI Management
 */

import NotificationCenter from './NotificationCenter.js';
import DialogManager from './DialogManager.js';
import LoadingOverlay from './LoadingOverlay.js';

class UISystem {
  constructor() {
    this.notification = null;
    this.dialog = null;
    this.loading = null;
  }

  init() {
    this.notification = new NotificationCenter();
    this.dialog = new DialogManager();
    this.loading = new LoadingOverlay();

    console.log('[UISystem] Initialized');
  }

  // Toast notifications
  toast(message, type = 'info') {
    return this.notification.show(message, type);
  }

  success(message) {
    return this.toast(message, 'success');
  }

  error(message) {
    return this.toast(message, 'error');
  }

  warning(message) {
    return this.toast(message, 'warning');
  }

  info(message) {
    return this.toast(message, 'info');
  }

  // Dialogs
  confirm(title, message) {
    return this.dialog.confirm(title, message);
  }

  alert(title, message) {
    return this.dialog.alert(title, message);
  }

  // Loading
  showLoading(message = 'Đang tải...') {
    return this.loading.show(message);
  }

  hideLoading() {
    return this.loading.hide();
  }
}

export default new UISystem();
