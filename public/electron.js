const { app, BrowserWindow, Tray, nativeImage, Menu } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const url = require('url')

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS
let mainWindow
let loadingWindow

if (isDev) {
  const devTools = require('electron-devtools-installer')
  installExtension = devTools.default
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS
}
//Tray
let tray = null
function createTray() {
  const icon = path.join(__dirname, '/app.jpg') // required.
  const trayicon = nativeImage.createFromPath(icon)
  tray = new Tray(trayicon.resize({ width: 16 }))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        if (!mainWindow) {
          createWindow()
        }
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.quit() // actually quit the app.
      },
    },
  ])
  tray.setContextMenu(contextMenu)

  tray.on('click', function (e) {
    if (!mainWindow) {
      createWindow()
    }
  })
}

function createWindow() {
  if (!tray) {
    // if tray hasn't been created already.
    createTray()
  }
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '/app.jpg'),
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  //create loading window.
  loadingWindow = new BrowserWindow({
    frame: false,
    width: 720,
    height: 480,
    show: true,
  })
  let loadingPath
  loadingPath = url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, 'splash.html'),
  })
  loadingWindow.loadURL(loadingPath)
  loadingWindow.setMenu(null)
  mainWindow.setMenu(null)

  mainWindow.once('ready-to-show', () => {
    loadingWindow.destroy()
    mainWindow.show()
  })

  // Load from localhost if in development
  // Otherwise load index.html file
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // Open DevTools if in dev mode
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// Create a new browser window by invoking the createWindow
// function once the Electron application is initialized.
// Install REACT_DEVELOPER_TOOLS as well if isDev
app.whenReady().then(() => {
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`))
  }

  createWindow()
})

// Add a new listener that tries to quit the application when
// it no longer has any open windows. This listener is a no-op
// on macOS due to the operating system's window management behavior.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    mainWindow = null
  }
})

// Add a new listener that creates a new browser window only if
// when the application has no visible windows after being activated.
// For example, after launching the application for the first time,
// or re-launching the already running application.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// The code above has been adapted from a starter example in the Electron docs:
// https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file
