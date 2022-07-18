/* import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTest.ts',
   },
});
 */

/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/components/__test__/setupTest.ts',
   },
   plugins: [react()],
});
