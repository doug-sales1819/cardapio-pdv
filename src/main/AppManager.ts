import type { App } from 'electron'

import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { default as MainWindow } from './MainWindow'

class AppManager {
  public mainWindow: MainWindow | null
  public application: App

  constructor() {
    this.mainWindow = null
    this.application = app

    this.application.whenReady().then(this.handleAppReady.bind(this))
    this.application.on('window-all-closed', this.handleAllWindowsClosed.bind(this))
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  private handleAppReady(): void {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    this.application.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    // IPC test
    ipcMain.on('ping', () => console.log('pong'))

    this.mainWindow = new MainWindow()

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    this.application.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.mainWindow = new MainWindow()
      }
    })
  }

  // Quit when all windows are closed, except on macOS. There, it's common
  private handleAllWindowsClosed(): void {
    if (process.platform !== 'darwin') {
      this.application.quit()
    }
  }
}

export default AppManager
