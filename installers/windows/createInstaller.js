const createWindowsInstaller = require('electron-winstaller')
  .createWindowsInstaller;
const path = require('path');

function getInstallerConfig() {
  console.log('creating windows installer');

  return Promise.resolve({
    appDirectory: 'electron2-win32-x64',
    authors: 'Maciek',
    noMsi: true,
    outputDirectory: 'installers/windows',
    exe: 'electron2.exe'
  });
}

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch(error => {
    console.error(error.message || error);
    process.exit(1);
  });
