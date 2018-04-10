const { ipcRenderer } = require('electron')

ipcRenderer.on('action-update-label', (event, arg) => {
  let label = document.getElementById('label')
  label.innerHTML = arg.message
  label.style.color = arg.color
  label.style.backgroundColor = arg.backgroundColor
})

ipcRenderer.on('action-update-color', (event, arg) => {
  document.getElementById('body').style.backgroundColor = arg
})
