const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 768 });
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));
  require('devtron').install();

  mainWindow.webContents.on('did-finish-load', () => {
    openFile();
  });
});

function openFile() {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openfile']
  });
  if (!files) return;

  const file = files[0];
  const content = fs.readFileSync(file).toString();

  console.log(content);
}
