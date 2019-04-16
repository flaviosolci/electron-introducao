// Esse é o processo principal. Somente aqui é possivel criar novas janelas
const { app, BrowserWindow, ipcMain } = require('electron')

let sobreWindow
let mainWindow

app.on('ready', () => {
  console.log('==== Aplicação Iniciada ====')
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  console.log(`Caminho Atual --> ${__dirname}`)

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
