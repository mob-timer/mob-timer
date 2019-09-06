const fs = require("fs");
const { shell } = require("electron");
const {
  stateFile,
  oldStateFile,
  mobTimerDir
} = require("./state-persister-paths");

function read() {
  if (fs.existsSync(stateFile)) {
    return JSON.parse(fs.readFileSync(stateFile, "utf-8"));
  }
  if (fs.existsSync(oldStateFile)) {
    return JSON.parse(fs.readFileSync(oldStateFile, "utf-8"));
  }
  return {};
}

function write(state) {
  if (!fs.existsSync(mobTimerDir)) {
    fs.mkdirSync(mobTimerDir);
  }
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
}

function openExternally() {
  return shell.openItem(stateFile);
}

module.exports = {
  read,
  write,
  openExternally
};
