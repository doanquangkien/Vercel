/**
 * build.js - Production build với Vite
 */

import { build } from 'vite';

async function buildForProduction() {
  try {
    console.log('🔨 Building for production...\n');

    await build({
      configFile: './vite.config.js'
    });

    console.log('\n✅ Build complete! Files are in ./dist\n');
    
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

buildForProduction();
