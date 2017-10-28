const { app, BrowserWindow } = require('electron');
const path = require('path');

const reload = require('electron-reload');
const isDev = require('electron-is-dev');

if (isDev) {
  const electronPath = path.join('node_modules', '.bin', 'electron');

  reload(__dirname, { electron: electronPath });
}

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });

  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

  require('devtron').install();
  //  mainWindow.openDevTools();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
