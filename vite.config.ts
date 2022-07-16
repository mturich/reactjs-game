/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
   test: {
      globals: true,
      setupFiles: 'setupTest.ts',
   },
   plugins: [react()],
});
