const moment = require('moment')
let segundos
let timerId

module.exports = {
  iniciar (el) {
    let tempo = moment.duration(el.textContent)
    segundos = tempo.asSeconds()
    console.log(`=== Duration ${segundos}`)
    clearInterval(timerId)
    timerId = setInterval(() => {
      segundos++
      el.textContent = this._segundosParaTempo(segundos)
    }, 1000)
    console.log(`=== Timer ID ${timerId}`)
  },

  _segundosParaTempo (segundos) {
    // 00:00:00
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss')
  },

  parar () {
    clearInterval(timerId)
  }
}
