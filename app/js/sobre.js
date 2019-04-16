// Esse é o processo de renderer. Não tem acesso as janelas
// Para se comunicar com as janelas precisa utilizar o IPC
// IPC = Inter Process Communication
const { ipcRenderer, shell } = require('electron')
const process = require('process')

let linkFechar = document.querySelector('#link-fechar')
let linkGithub = document.querySelector('#link-github')
let versaoElectron = document.querySelector('#versao-electron')

window.onload = () => {
  versaoElectron.textContent = process.versions.electron
}

linkFechar.addEventListener('click', (event) => {
  ipcRenderer.send('fechar-janela-sobre')
})

linkGithub.addEventListener('click', (event) => {
  shell.openExternal('https://github.com/flaviosolci')
})
