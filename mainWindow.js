// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron')
const colorsSelector = document.querySelector('select[name="colors"]')

document.getElementById('btn').addEventListener('click', () => {
  let Data = {
    message: document.getElementById('field').value,
    backgroundColor: 'black',
    color: 'white'
  }

  ipcRenderer.send('request-update-label-in-second-window', Data)
}, false)

function changeSecondWindowBackgroundColor (elem) {
  // document.getElementById('app').style.backgroundColor = elem.value
  ipcRenderer.send('request-update-background-color-in-second-window', elem.value)
}
