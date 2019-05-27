const electron = require("electron");

exports.createConfigWindow = () => {
  const configWindowInstance = new electron.BrowserWindow({
    width: 420,
    height: 500,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  configWindowInstance.loadURL(`file://${__dirname}/index.html`);

  return {
    instance: configWindowInstance,
    showWindow: () => configWindowInstance.show(),
    onClose: callback => configWindowInstance.on("closed", callback)
  };
};
