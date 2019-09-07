const { ipcMain } = require("electron");
const { openExternally } = require("./state/state-persister");

describe("main", () => {
  it("should register main process listeners", () => {
    require("./main");
    expect(ipcMain.on.mock.calls).toEqual(
      expect.arrayContaining([
        ["setShuffleMobbersOnStartup", expect.any(Function)],
        ["timerWindowReady", expect.any(Function)],
        ["configWindowReady", expect.any(Function)],
        ["fullscreenWindowReady", expect.any(Function)],
        ["pause", expect.any(Function)],
        ["unpause", expect.any(Function)],
        ["skip", expect.any(Function)],
        ["startTurn", expect.any(Function)],
        ["configure", expect.any(Function)],
        ["shuffleMobbers", expect.any(Function)],
        ["addMobber", expect.any(Function)],
        ["removeMobber", expect.any(Function)],
        ["updateMobber", expect.any(Function)],
        ["setSecondsPerTurn", expect.any(Function)],
        ["setSecondsUntilFullscreen", expect.any(Function)],
        ["setSnapThreshold", expect.any(Function)],
        ["setAlertSoundTimes", expect.any(Function)],
        ["setAlertSound", expect.any(Function)],
        ["setTimerAlwaysOnTop", expect.any(Function)],
        ["setShuffleMobbersOnStartup", expect.any(Function)],
        ["openStateFileExternally", openExternally]
      ])
    );
  });
});
