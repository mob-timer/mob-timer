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
    showWindow: () => configWindowInstance.show(),
    onClose: callback => configWindowInstance.on("closed", callback),
    sendEvent: (event, data) =>
      configWindowInstance.webContents.send(event, data)
  };
};
