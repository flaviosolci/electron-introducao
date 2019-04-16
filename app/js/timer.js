const moment = require('moment')
const { ipcRenderer } = require('electron')

let segundos
let timerId
let tempo

module.exports = {
  iniciar (el) {
    tempo = moment.duration(el.textContent)
    segundos = tempo.asSeconds()
    clearInterval(timerId)
    timerId = setInterval(() => {
      segundos++
      el.textContent = this._segundosParaTempo(segundos)
    }, 1000)
  },

  parar (nomeCurso) {
    clearInterval(timerId)
    ipcRenderer.send('curso-parado', nomeCurso, this._segundosParaTempo(segundos))
  },

  _segundosParaTempo (segundos) {
    // 00:00:00
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss')
  }
}
