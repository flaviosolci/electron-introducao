// Esse é o processo de renderer. Não tem acesso as janelas
// Para se comunicar com as janelas precisa utilizar o IPC
// IPC = Inter Process Communication
const { ipcRenderer } = require('electron')
const timer = require('./timer')

let linkSobre = document.querySelector('#link-sobre')
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')

linkSobre.addEventListener('click', (event) => {
  ipcRenderer.send('abrir-janela-sobre')
})

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false
botaoPlay.addEventListener('click', () => {
  if (play) {
    timer.parar()
    play = false
  } else {
    timer.iniciar(tempo)
    play = true
  }

  imgs = imgs.reverse()
  botaoPlay.src = imgs[0]
})