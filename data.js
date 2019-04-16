const jsonfile = require('jsonfile-promised')
const fs = require('fs')
const moment = require('moment')

module.exports = {
  salvaDados (curso, tempoEstudado) {
    let arquivDoCurso = this._formataNomeArquivoDoCurso(curso)
    if (fs.existsSync(arquivDoCurso)) {
      this.adicionarTempoAoCurso(arquivDoCurso, tempoEstudado)
    } else {
      this.criaArquivoDeCurso(arquivDoCurso, {})
        .then(() => { this.adicionarTempoAoCurso(arquivDoCurso, tempoEstudado) })
    }
  },

  adicionarTempoAoCurso (arquivoDoCurso, tempoEstudado) {
    let dados = {
      ultimoEstudo: moment().format('DD/MMM/YYYY HH:mm:ss'),
      tempo: tempoEstudado
    }
    jsonfile.writeFile(arquivoDoCurso, dados, { spaces: 2 })
      .then(console.log('Tempo salvo com sucesso'))
      .catch(error => console.log(error))
  },

  criaArquivoDeCurso (nomeArquivo, conteudoArquivo) {
    return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
      .then(() => console.log('Arquivo Criado'))
      .catch((erro) => console.log(erro))
  },

  carregaCurso (nomeCurso) {
    let arquivoDoCurso = this._formataNomeArquivoDoCurso(nomeCurso)
    console.log(`=== Curso sendo carregado -> ${arquivoDoCurso}`)

    return jsonfile.readFile(arquivoDoCurso)
  },

  _formataNomeDoCurso (curso) {
    return curso.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_').toLowerCase()
  },

  _formataNomeArquivoDoCurso (nomeDoCurso) {
    return `${__dirname}/data/${this._formataNomeDoCurso(nomeDoCurso)}.json`
  }
}
