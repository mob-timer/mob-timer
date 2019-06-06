const { initialize } = require("./initialize");
const mockElectron = require("electron");
const mockLazySingletonWindow = require("../lazy-singleton-window");

jest.mock("electron", () => ({
  BrowserWindow: jest.fn()
}));
jest.mock("../lazy-singleton-window", () => ({
  asLazySingletonWindow: jest.fn()
}));

describe("config window initialize", () => {
  it("should prepare for creating singleton window", () => {
    const mockShowWindow = jest.fn();
    const mockTrySendEvent = jest.fn();
    mockLazySingletonWindow.asLazySingletonWindow.mockImplementation(() => ({
      showWindow: mockShowWindow,
      trySendEvent: mockTrySendEvent
    }));

    const configWindow = initialize();

    expect(configWindow).toEqual({
      showConfigWindow: mockShowWindow,
      sendEventToConfigWindow: mockTrySendEvent
    });
  });

  describe("createBrowserWindow factory", () => {
    it("should create BrowserWindow with correct configuration", () => {
      const mockShowWindow = jest.fn();
      const mockTrySendEvent = jest.fn();
      mockLazySingletonWindow.asLazySingletonWindow.mockImplementation(() => ({
        showWindow: mockShowWindow,
        trySendEvent: mockTrySendEvent
      }));
      mockBrowserWindowConstructor(mockElectron.BrowserWindow);
      initialize();
      const createBrowserWindow =
        mockLazySingletonWindow.asLazySingletonWindow.mock.calls[0][0];

      createBrowserWindow();

      expect(mockElectron.BrowserWindow).toHaveBeenCalledWith({
        autoHideMenuBar: true,
        height: 650,
        webPreferences: { nodeIntegration: true },
        width: 420
      });
    });

    it("should load index.html after creating BrowserWindow", () => {
      const mockShowWindow = jest.fn();
      const mockTrySendEvent = jest.fn();
      mockLazySingletonWindow.asLazySingletonWindow.mockImplementation(() => ({
        showWindow: mockShowWindow,
        trySendEvent: mockTrySendEvent
      }));
      const { mockLoadURL } = mockBrowserWindowConstructor(
        mockElectron.BrowserWindow
      );
      initialize();
      const createBrowserWindow =
        mockLazySingletonWindow.asLazySingletonWindow.mock.calls[0][0];

      createBrowserWindow();

      expect(mockLoadURL).toHaveBeenCalledWith(
        expect.stringContaining("config/index.html")
      );
    });

    const mockBrowserWindowConstructor = mockBrowserWindow => {
      const mockLoadURL = jest.fn();
      mockBrowserWindow.mockImplementation(function() {
        const invokedAsConstructor =
          this.constructor.name === "mockConstructor";
        if (!invokedAsConstructor) {
          throw new Error(
            "BrowserWindow not invoked as ctor, did you forget new?"
          );
        }
        return {
          loadURL: mockLoadURL
        };
      });

      return {
        mockLoadURL
      };
    };
  });
});
