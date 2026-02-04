/**
 * LoadingOverlay.js - Loading spinner overlay
 */

class LoadingOverlay {
  constructor() {
    this.overlay = null;
    this.init();
  }

  init() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'loading-overlay';
    this.overlay.className = 'fixed inset-0 bg-black/30 z-50 hidden items-center justify-center';
    
    this.overlay.innerHTML = `
      <div class="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-xl">
        <div class="spinner"></div>
        <div id="loading-message" class="text-gray-700 font-medium">Đang tải...</div>
      </div>
    `;

    document.body.appendChild(this.overlay);
  }

  show(message = 'Đang tải...') {
    const messageEl = this.overlay.querySelector('#loading-message');
    if (messageEl) {
      messageEl.textContent = message;
    }

    this.overlay.classList.remove('hidden');
    this.overlay.classList.add('flex');
  }

  hide() {
    this.overlay.classList.add('hidden');
    this.overlay.classList.remove('flex');
  }
}

export default LoadingOverlay;
