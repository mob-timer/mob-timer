const { initialize } = require("./initialize");
const mockElectron = require("electron");

jest.mock("electron", () => ({
  BrowserWindow: jest.fn()
}));

describe("config window initialize", () => {
  describe("showConfigWindow", () => {
    it("should create BrowserWindow with correct configuration", () => {
      mockElectron.BrowserWindow.mockImplementation(function() {
        const invokedAsConstructor =
          this.constructor.name === "mockConstructor";
        if (!invokedAsConstructor) {
          throw new Error(
            "BrowserWindow not invoked as ctor, did you forget new?"
          );
        }
        return { loadURL: () => {}, on: () => {} };
      });

      const configWindow = initialize();
      configWindow.showConfigWindow();

      expect(mockElectron.BrowserWindow).toHaveBeenCalledWith({
        autoHideMenuBar: true,
        height: 650,
        webPreferences: { nodeIntegration: true },
        width: 420
      });
    });

    it("should load index.html after creating BrowserWindow", () => {
      const mockLoadURL = jest.fn();
      mockElectron.BrowserWindow.mockImplementation(function() {
        const invokedAsConstructor =
          this.constructor.name === "mockConstructor";
        if (!invokedAsConstructor) {
          throw new Error(
            "BrowserWindow not invoked as ctor, did you forget new?"
          );
        }
        return { loadURL: mockLoadURL, on: () => {} };
      });

      const configWindow = initialize();
      configWindow.showConfigWindow();

      expect(mockLoadURL).toHaveBeenCalledWith(
        expect.stringContaining("config/index.html")
      );
    });

    it("should re-open same BrowserWindow if not closed", () => {
      const mockLoadURL = jest.fn();
      const mockShow = jest.fn();
      mockElectron.BrowserWindow.mockImplementation(function() {
        const invokedAsConstructor =
          this.constructor.name === "mockConstructor";
        if (!invokedAsConstructor) {
          throw new Error(
            "BrowserWindow not invoked as ctor, did you forget new?"
          );
        }
        return { loadURL: mockLoadURL, on: () => {}, show: mockShow };
      });

      const configWindow = initialize();
      configWindow.showConfigWindow();
      configWindow.showConfigWindow();

      expect(mockShow).toHaveBeenCalledTimes(1);
    });

    it("should create new BrowserWindow if old is closed", () => {
      const mockLoadURL = jest.fn();
      const mockShow = jest.fn();
      const mockOn = jest.fn();
      mockElectron.BrowserWindow.mockImplementation(function() {
        const invokedAsConstructor =
          this.constructor.name === "mockConstructor";
        if (!invokedAsConstructor) {
          throw new Error(
            "BrowserWindow not invoked as ctor, did you forget new?"
          );
        }
        return { loadURL: mockLoadURL, on: mockOn, show: mockShow };
      });

      const configWindow = initialize();
      configWindow.showConfigWindow();
      simulateEvent(mockOn, "closed");
      configWindow.showConfigWindow();

      const mockCallCounts = {
        BrowserWindow: mockElectron.BrowserWindow.mock.calls.length,
        BrowserWindowLoadURL: mockLoadURL.mock.calls.length,
        BrowserWindowShow: mockShow.mock.calls.length
      };
      expect(mockCallCounts).toEqual({
        BrowserWindow: 2,
        BrowserWindowLoadURL: 2,
        BrowserWindowShow: 0
      });
    });

    it("should send event to BrowserWindow webContents", () => {
      const mockLoadURL = jest.fn();
      const mockShow = jest.fn();
      const mockOn = jest.fn();
      const mockWebContentsSend = jest.fn();
      mockElectron.BrowserWindow.mockImplementation(function() {
        const invokedAsConstructor =
          this.constructor.name === "mockConstructor";
        if (!invokedAsConstructor) {
          throw new Error(
            "BrowserWindow not invoked as ctor, did you forget new?"
          );
        }
        return {
          loadURL: mockLoadURL,
          on: mockOn,
          show: mockShow,
          webContents: {
            send: mockWebContentsSend
          }
        };
      });

      const configWindow = initialize();
      configWindow.showConfigWindow();
      configWindow.sendEventToConfigWindow("fake-event", "fake-event-data");

      expect(mockWebContentsSend).toHaveBeenCalledWith(
        "fake-event",
        "fake-event-data"
      );
    });

    it("should not send event if there never was a BrowserWindow", () => {
      const mockLoadURL = jest.fn();
      const mockShow = jest.fn();
      const mockOn = jest.fn();
      const mockWebContentsSend = jest.fn();
      mockElectron.BrowserWindow.mockImplementation(function() {
        const invokedAsConstructor =
          this.constructor.name === "mockConstructor";
        if (!invokedAsConstructor) {
          throw new Error(
            "BrowserWindow not invoked as ctor, did you forget new?"
          );
        }
        return {
          loadURL: mockLoadURL,
          on: mockOn,
          show: mockShow,
          webContents: {
            send: mockWebContentsSend
          }
        };
      });

      const configWindow = initialize();
      configWindow.sendEventToConfigWindow("fake-event", "fake-event-data");

      expect(mockWebContentsSend).not.toHaveBeenCalled();
    });

    it("should not send event if BrowserWindow has closed", () => {
      const mockLoadURL = jest.fn();
      const mockShow = jest.fn();
      const mockOn = jest.fn();
      const mockWebContentsSend = jest.fn();
      mockElectron.BrowserWindow.mockImplementation(function() {
        const invokedAsConstructor =
          this.constructor.name === "mockConstructor";
        if (!invokedAsConstructor) {
          throw new Error(
            "BrowserWindow not invoked as ctor, did you forget new?"
          );
        }
        return {
          loadURL: mockLoadURL,
          on: mockOn,
          show: mockShow,
          webContents: {
            send: mockWebContentsSend
          }
        };
      });

      const configWindow = initialize();
      configWindow.showConfigWindow();
      simulateEvent(mockOn, "closed");
      configWindow.sendEventToConfigWindow("fake-event", "fake-event-data");

      expect(mockWebContentsSend).not.toHaveBeenCalled();
    });

    const simulateEvent = (mockOn, eventName) => {
      mockOn.mock.calls
        .filter(args => args[0] === eventName)
        .forEach(args => args[1]());
    };
  });
});
