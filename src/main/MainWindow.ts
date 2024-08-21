import { BrowserWindow, shell } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'node:path'
import { default as icon } from '../../resources/icon.png?asset'

class MainWindow {
  private mainWindow: BrowserWindow | null = null

  constructor() {
    this.initializeMainWindow()
    this.registerEventHandlers()
    this.loadContent()
  }

  private initializeMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      minHeight: 800,
      minWidth: 1200,
      darkTheme: true,
      show: false,
      hasShadow: true,
      center: true,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
  }

  private registerEventHandlers(): void {
    this.mainWindow?.on('ready-to-show', () => {
      this.mainWindow?.show()
    })

    this.mainWindow?.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    this.mainWindow?.on('closed', () => {
      this.mainWindow = null
    })
  }

  private loadContent(): void {
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow?.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.mainWindow?.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }
}

export default MainWindow
