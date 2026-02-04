/**
 * NotificationCenter.js - Toast notifications
 */

class NotificationCenter {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'notification-container';
    this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 3000) {
    const toast = this.createToast(message, type);
    this.container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      this.remove(toast);
    }, duration);

    return toast;
  }

  createToast(message, type) {
    const toast = document.createElement('div');
    
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };

    toast.className = `${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in`;
    
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <span class="text-xl font-bold">${icons[type]}</span>
      <span class="flex-1">${message}</span>
      <button class="hover:bg-white/20 rounded p-1" onclick="this.parentElement.remove()">✕</button>
    `;

    return toast;
  }

  remove(toast) {
    toast.classList.add('animate-slide-out');
    setTimeout(() => toast.remove(), 300);
  }
}

export default NotificationCenter;
