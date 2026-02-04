/**
 * dev.js - Development server với Vite
 */

import { createServer } from 'vite';

async function startDevServer() {
  try {
    const server = await createServer({
      configFile: './vite.config.js',
      server: {
        port: 3000,
        open: '/admin.html'
      }
    });

    await server.listen();
    
    console.log('\n🚀 MECWISH Development Server');
    console.log(`\n   Admin:  http://localhost:3000/admin.html`);
    console.log(`   Client: http://localhost:3000/index.html\n`);
    
  } catch (err) {
    console.error('Failed to start dev server:', err);
    process.exit(1);
  }
}

startDevServer();
