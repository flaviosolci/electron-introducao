// Esse é o processo de renderer. Não tem acesso as janelas
// Para se comunicar com as janelas precisa utilizar o IPC
// IPC = Inter Process Communication
/* eslint no-new: "off" , no-undef:"off" */
const { ipcRenderer } = require('electron')
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre')
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')
let botaoAdicionar = document.querySelector('.botao-adicionar')
let campoAdd = document.querySelector('.campo-adicionar')

window.onload = () => {
  data.carregaCurso(curso.textContent).then((dados) => { tempo.textContent = dados.tempo })
}

linkSobre.addEventListener('click', (event) => {
  ipcRenderer.send('abrir-janela-sobre')
})

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false
botaoPlay.addEventListener('click', () => {
  if (play) {
    timer.parar(curso.textContent)
    play = false
    new Notification('Alura Timer', {
      body: `O curso ${curso.textContent} foi parado!!`,
      icon: 'img/stop-button.png'
    })
  } else {
    timer.iniciar(tempo)
    play = true
    new Notification('Alura Timer', {
      body: `O curso ${curso.textContent} foi iniciado!!`,
      icon: 'img/play-button.png'
    })
  }

  imgs = imgs.reverse()
  botaoPlay.src = imgs[0]
})

ipcRenderer.on('curso-trocado', (event, cursoCarregado) => {
  console.log(`=== Curso Trocado --> ${JSON.stringify(cursoCarregado)}`)
  timer.parar(curso.textContent)
  play = false
  tempo.textContent = cursoCarregado.tempo
  curso.textContent = cursoCarregado.nomeCurso

  imgs = imgs.reverse()
  botaoPlay.src = imgs[0]
})

botaoAdicionar.addEventListener('click', () => {
  if (campoAdd.value !== '') {
    let novoCurso = campoAdd.value
    curso.textContent = novoCurso
    tempo.textContent = '00:00:00'
    campoAdd.value = ''
    ipcRenderer.send('novo-curso', novoCurso)
  }
})

ipcRenderer.on('atalho-iniciar-parar', () => {
  let click = new MouseEvent('click')
  botaoPlay.dispatchEvent(click)
})
