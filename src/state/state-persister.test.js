const persister = require("./state-persister");
const sinon = require("sinon");
const fs = require("fs");

describe("state-persister", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => sandbox.restore());

  describe("read", () => {
    const stateData = { some: "state" };
    const oldStateData = { older: "data" };

    beforeEach(() => {
      sandbox
        .stub(fs, "readFileSync")
        .withArgs(persister.stateFile, "utf-8")
        .callsFake(() => JSON.stringify(stateData))
        .withArgs(persister.oldStateFile, "utf-8")
        .callsFake(() => JSON.stringify(oldStateData));
    });

    it("should return the contents of the state.json file", () => {
      sandbox
        .stub(fs, "existsSync")
        .withArgs(persister.stateFile)
        .callsFake(() => true);

      const result = persister.read();
      expect(result).toEqual(stateData);
    });

    it("should look for the old state file if the new one does not exist", () => {
      sandbox
        .stub(fs, "existsSync")
        .withArgs(persister.stateFile)
        .callsFake(() => false)
        .withArgs(persister.oldStateFile)
        .callsFake(() => true);

      const result = persister.read();
      expect(result).toEqual(oldStateData);
    });

    it("should return an empty object if no state file exists", () => {
      sandbox
        .stub(fs, "existsSync")
        .withArgs(persister.stateFile)
        .callsFake(() => false)
        .withArgs(persister.oldStateFile)
        .callsFake(() => false);

      const result = persister.read();
      expect(result).toEqual({});
    });
  });

  describe("write", () => {
    const stateToWrite = { state: "new" };

    beforeEach(() => {
      sandbox.stub(fs, "writeFileSync");
      sandbox.stub(fs, "mkdirSync");
    });

    it("should write the state to the file", () => {
      sandbox
        .stub(fs, "existsSync")
        .withArgs(persister.mobTimerDir)
        .callsFake(() => true);

      persister.write(stateToWrite);

      sinon.assert.notCalled(fs.mkdirSync);
      sinon.assert.calledWith(
        fs.writeFileSync,
        persister.stateFile,
        JSON.stringify(stateToWrite, null, 2)
      );
    });

    it("should create the directory if needed", () => {
      sandbox
        .stub(fs, "existsSync")
        .withArgs(persister.mobTimerDir)
        .callsFake(() => false);

      persister.write(stateToWrite);

      sinon.assert.calledWith(fs.mkdirSync, persister.mobTimerDir);
      sinon.assert.calledWith(
        fs.writeFileSync,
        persister.stateFile,
        JSON.stringify(stateToWrite, null, 2)
      );
    });
  });
});
