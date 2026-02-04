/**
 * DialogManager.js - Modal dialogs
 */

class DialogManager {
  constructor() {
    this.overlay = null;
    this.init();
  }

  init() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.id = 'dialog-overlay';
    this.overlay.className = 'fixed inset-0 bg-black/50 z-50 hidden items-center justify-center';
    document.body.appendChild(this.overlay);

    // Click outside to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
  }

  confirm(title, message) {
    return new Promise((resolve) => {
      const dialog = this.createDialog(title, message, [
        {
          text: 'Hủy',
          class: 'btn btn-secondary',
          onClick: () => {
            this.close();
            resolve(false);
          }
        },
        {
          text: 'Xác nhận',
          class: 'btn btn-primary',
          onClick: () => {
            this.close();
            resolve(true);
          }
        }
      ]);

      this.show(dialog);
    });
  }

  alert(title, message) {
    return new Promise((resolve) => {
      const dialog = this.createDialog(title, message, [
        {
          text: 'Đóng',
          class: 'btn btn-primary',
          onClick: () => {
            this.close();
            resolve();
          }
        }
      ]);

      this.show(dialog);
    });
  }

  createDialog(title, message, buttons) {
    const dialog = document.createElement('div');
    dialog.className = 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6';

    const buttonsHtml = buttons.map(btn => 
      `<button class="${btn.class}" data-action="${btn.text}">${btn.text}</button>`
    ).join('');

    dialog.innerHTML = `
      <h3 class="text-xl font-bold mb-4">${title}</h3>
      <p class="text-gray-600 mb-6">${message}</p>
      <div class="flex gap-3 justify-end">
        ${buttonsHtml}
      </div>
    `;

    // Attach button handlers
    buttons.forEach((btn, index) => {
      const btnEl = dialog.querySelectorAll('button')[index];
      btnEl.addEventListener('click', btn.onClick);
    });

    return dialog;
  }

  show(dialog) {
    this.overlay.innerHTML = '';
    this.overlay.appendChild(dialog);
    this.overlay.classList.remove('hidden');
    this.overlay.classList.add('flex');
  }

  close() {
    this.overlay.classList.add('hidden');
    this.overlay.classList.remove('flex');
    this.overlay.innerHTML = '';
  }
}

export default DialogManager;
