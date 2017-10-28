const { app, BrowserWindow, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({ width: 1024, height: 768 });
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));
  require('devtron').install();
});

function openFile() {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openfile'],
    filters: [
      {
        name: 'Markdown files',
        extensions: ['md', 'txt']
      }
    ],
    title: 'kick it',
    buttonLabel: 'kick it'
  });

  if (!files) return;

  const file = files[0];
  const content = fs.readFileSync(file).toString();

  mainWindow.webContents.send('file-opened', file, content);
  mainWindow.setTitle(file);
}

function saveFile(content) {
  const filename = dialog.showSaveDialog(mainWindow, {
    title: 'Save HTML output',
    defaultPath: app.getPath('documents'),
    filters: [
      {
        name: 'MD Files',
        extensions: ['txt', 'md']
      }
    ]
  });

  if (!filename) return;

  fs.writeFileSync(filename, content);
}

exports.openFile = openFile;
exports.saveFile = saveFile;

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click() {
          openFile();
        }
      },
      {
        label: 'Save...',
        accelerator: 'CmdOrCtrl+S',
        click() {
          // We can't call saveFile(content) directly because we need to get
          // the content from the renderer process. So, send a message to the
          // renderer, telling it we want to save the file.
          mainWindow.webContents.send('save-file');
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  },
  {
    label: 'Developer',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator:
          process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click() {
          mainWindow.webContents.toggleDevTools();
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }
    ]
  });
}
