// Esse é o processo principal. Somente aqui é possivel criar novas janelas
const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const data = require('./data')
const template = require('./template')

let sobreWindow
let mainWindow
let tray

app.on('ready', () => {
  console.log('==== Aplicação Iniciada ====')
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  tray = new Tray(`${__dirname}/app/img/icon-tray.png`)
  tray.setToolTip('Alura Timer')
  const templateMenu = template.geraTrayMenu(mainWindow)
  const trayMenu = Menu.buildFromTemplate(templateMenu)
  tray.setContextMenu(trayMenu)

  console.log(`==== Caminho Atual --> ${__dirname}`)

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
})

app.on('window-all-closed', () => {
  console.log('==== Fechando a aplicação ====')
  app.quit()
})

ipcMain.on('abrir-janela-sobre', () => {
  if (sobreWindow == null) {
    sobreWindow = new BrowserWindow({
      width: 300,
      height: 220,
      frame: false,
      resizable: false,
      modal: true,
      parent: mainWindow
    })
    sobreWindow.on('closed', () => {
      sobreWindow = null
    })
  }
  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`)
})

ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close()
})

ipcMain.on('curso-parado', (event, nomeCurso, tempoEstudado) => {
  console.log(`O curso ${nomeCurso} for estudado por ${tempoEstudado}`)
  data.salvaDados(nomeCurso, tempoEstudado)
})

ipcMain.on('novo-curso', (event, nomeCurso) => {
  const templateMenu = template.adicionaCursoNoTray(nomeCurso, mainWindow)
  const trayMenu = Menu.buildFromTemplate(templateMenu)
  tray.setContextMenu(trayMenu)
})
