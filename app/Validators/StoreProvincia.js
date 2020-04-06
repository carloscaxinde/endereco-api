'use strict'

class StoreProvincia {
  get rules () {
    return {
      nome: 'required|min:3|unique:provincias',
          slug: 'required|min:3|unique:provincias',
          capital: 'required|min:6',
          regiao: 'required|min:3'
    }
  }

  get messages () {
    return {
      'nome.required': 'Este campo é obrigatório',
      'nome.unique': 'Esta província já existe',
      'nome.min': 'O nome ter no minimo 3 caracteres',
      'nome.max': 'O nome ter no máximo 20 caracteres'
    }
  }
}

module.exports = StoreProvincia
