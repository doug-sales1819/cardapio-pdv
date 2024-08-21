import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import { default as react } from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), swcPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: [
        {
          find: '@renderer',
          replacement: resolve('src/renderer/src')
        }
      ]
    },
    plugins: [react()]
  }
})
