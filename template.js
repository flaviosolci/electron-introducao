const data = require('./data')
const { ipcMain } = require('electron')

module.exports = {
  _templateTrayMenu: [],

  geraTrayMenu (win) {
    this._templateTrayMenu = [
      { label: 'Cursos' },
      { type: 'separator' }
    ]
    let cursos = data.pegaNomeDosCursos()
    cursos.forEach(curso => {
      let menuItem = {
        label: curso.nomeCurso,
        sublabel: `Tempo: ${curso.tempo}`,
        type: 'radio',
        click: () => {
          win.send('curso-trocado', curso)
        }
      }
      this._templateTrayMenu.push(menuItem)
    })
    this._templateTrayMenu.push({ type: 'separator' }, { label: 'Sair' })
    return this._templateTrayMenu
  },

  adicionaCursoNoTray (curso, win) {
    // remove last separator and Sair
    this._templateTrayMenu.pop()
    this._templateTrayMenu.pop()

    this._templateTrayMenu.push({
      label: curso,
      sublabel: 'Tempo: 00:00:00',
      type: 'radio',
      checked: true,
      click: () => {
        win.send('curso-trocado', { nomeCurso: curso, tempo: '00:00:00' })
      }
    })
    this._templateTrayMenu.push({ type: 'separator' }, { label: 'Sair' })
    return this._templateTrayMenu
  },
  geraMenuPrincipal (appName, isDebug) {
    const template = []
    if (isDebug) {
      template.push({
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' }
        ]
      })
    }

    // about
    template.push({
      role: 'help',
      submenu: [
        {
          label: 'Sobre',
          accelerator: 'CmdOrCtrl+K',
          click () { ipcMain.emit('abrir-janela-sobre') }

        }
      ]
    })

    if (process.platform === 'darwin') {
      template.unshift({
        label: appName,
        submenu: [
          { role: 'quit' }
        ]
      })

      // Window menu
      template[3].submenu = [
        { role: 'close' },
        { role: 'minimize' }
      ]
    }

    return template
  }
}
