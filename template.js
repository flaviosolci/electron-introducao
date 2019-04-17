const data = require('./data')

module.exports = {
  geraTrayMenu (win) {
    let template = [
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
      template.push(menuItem)
    })
    template.push({ type: 'separator' }, { label: 'Sair' })
    return template
  }
}
