const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const { ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let secondWindow

function createWindow () {
  // Create the browser window.
  const screen = electron.screen
  const mainScreen = screen.getPrimaryDisplay()
  const dimensions = mainScreen.workAreaSize
  console.log(dimensions.width + " x " + dimensions.height)

  let config = {
    width: dimensions.width / 2,
    height: dimensions.height / 2,
    x: 0,
    y: dimensions.height / 4
  }
  mainWindow = new BrowserWindow(config)
  config.x = dimensions.width / 2
  secondWindow = new BrowserWindow(config)

  // and load the index.html of the app.
  const filePath = {
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }
  mainWindow.loadURL(url.format(filePath))

  const secondWindowFilePath = {
    pathname: path.join(__dirname, 'secondWindow.html'),
    protocol: 'file:',
    slashes: true
  }
  secondWindow.loadURL(url.format(secondWindowFilePath))
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    secondWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('request-update-label-in-second-window', (event, arg) => {
  secondWindow.webContents.send('action-update-label', arg)
})

ipcMain.on('request-update-background-color-in-second-window', (event, arg) => {
  secondWindow.webContents.send('action-update-color', arg)
})
