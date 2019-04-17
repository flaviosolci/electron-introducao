const data = require('./data')

module.exports = {
  _template: [],

  geraTrayMenu (win) {
    this._template = [
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
      this._template.push(menuItem)
    })
    this._template.push({ type: 'separator' }, { label: 'Sair' })
    return this._template
  },

  adicionaCursoNoTray (curso, win) {
    // remove last separator and Sair
    this._template.pop()
    this._template.pop()

    this._template.push({
      label: curso,
      sublabel: 'Tempo: 00:00:00',
      type: 'radio',
      checked: true,
      click: () => {
        win.send('curso-trocado', { nomeCurso: curso, tempo: '00:00:00' })
      }
    })
    this._template.push({ type: 'separator' }, { label: 'Sair' })
    return this._template
  }
}
