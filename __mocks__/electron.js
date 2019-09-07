module.exports = {
  BrowserWindow: jest.fn(),
  shell: {
    openItem: jest.fn()
  },
  ipcMain: {
    on: jest.fn()
  },
  app: {
    on: jest.fn()
  }
};
