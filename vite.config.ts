/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  // custom 
  // build: {
  //     rollupOptions: {
  //         output:{
  //             manualChunks(id) {
  //                 if (id.includes('node_modules')) {
  //                     return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //                 }
  //             }
  //         }
  //     }
  // }
})
