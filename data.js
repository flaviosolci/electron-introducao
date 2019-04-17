const jsonfile = require('jsonfile-promised')
const jsonfileSync = require('jsonfile')
const fs = require('fs')
const moment = require('moment')

module.exports = {
  salvaDados (curso, tempoEstudado) {
    let arquivDoCurso = this._formataNomeArquivoDoCurso(curso)
    if (fs.existsSync(arquivDoCurso)) {
      this.adicionarTempoAoCurso(arquivDoCurso, tempoEstudado, curso)
    } else {
      this.criaArquivoDeCurso(arquivDoCurso, {})
        .then(() => { this.adicionarTempoAoCurso(arquivDoCurso, tempoEstudado, curso) })
    }
  },

  adicionarTempoAoCurso (arquivoDoCurso, tempoEstudado, oNomeCurso) {
    let dados = {
      nomeCurso: oNomeCurso,
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

  pegaNomeDosCursos () {
    let arquivos = fs.readdirSync(`${__dirname}/data/`)
    console.log(`==== Arquivos no diretorio (${__dirname}/data/): ${arquivos}`)
    let cursos = []
    if (arquivos != null) {
      arquivos.forEach(arquivo => {
        let dados = jsonfileSync.readFileSync(`${__dirname}/data/${arquivo}`)
        cursos.push(dados)
      })
    }
    console.log(`==== Cursos encontrados: ${cursos}`)
    return cursos
  },

  _formataNomeDoCurso (curso) {
    return curso.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_').toLowerCase()
  },

  _formataNomeArquivoDoCurso (nomeDoCurso) {
    return `${__dirname}/data/${this._formataNomeDoCurso(nomeDoCurso)}.json`
  }
}
