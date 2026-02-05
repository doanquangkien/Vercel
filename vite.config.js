import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Root để mặc định là thư mục gốc (nơi chứa index.html và admin.html sau khi di chuyển)
  root: '.', 
  
  // Public dir là nơi chứa ảnh tĩnh
  publicDir: 'public',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // File gốc đã dời ra ngoài
        admin: path.resolve(__dirname, 'admin.html') // File admin đã dời ra ngoài
      }
    }
  },
  
  server: {
    port: 3000,
    open: '/admin.html',
    cors: true
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@shared': path.resolve(__dirname, './src/shared')
    }
  }
});
