const ipc = require('electron').ipcRenderer

const mobbersEl = document.getElementById('mobbers')
const minutesEl = document.getElementById('minutes')
const addEl = document.getElementById('add')
const addMobberForm = document.getElementById('addMobberForm')

function createMobberEl(mobber) {
  const el = document.createElement('div')
  el.innerHTML = mobber.name
  return el
}

ipc.on('configUpdated', (event, data) => {
  minutesEl.value = Math.ceil(data.secondsPerTurn / 60)
  mobbersEl.innerHTML = ''
  const frag = document.createDocumentFragment()
  data.mobbers.map(mobber => {
    frag.appendChild(createMobberEl(mobber))
  })
  mobbersEl.appendChild(frag)
})

addMobberForm.addEventListener('submit', event => {
  event.preventDefault()
  ipc.send('addMobber', { name: addEl.value })
  addEl.value = ''
})


ipc.send('configWindowReady')
