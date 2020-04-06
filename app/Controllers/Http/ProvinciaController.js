'use strict'

const Provincia = use('App/Models/Provincia')
const  { validateAll } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with provincias
 */
class ProvinciaController {
  /**
   * Show a list of all provincias.
   * GET provincias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
        
      const provincia = await Provincia.query().with('municipios').fetch()

      if (!provincia) {
        return response.status(404).send({message: 'Nenhum registro encontrado'})
      }

      return provincia

    } catch (error) {
      return response.status(500).send( {error: 'Erro: ${err.message}'} )
    }
  }

  /**
   * Create/save a new provincia.
   * POST provincias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    try {

      const validation = await validateAll(request.all(),  {
        nome: 'required|min:3|max:20|unique:provincias',
        capital: 'required|min:3|max:20|unique:provincias',
        regiao: 'required|min:3'
    })

    if (validation.fails()) {
        return response.status(401).send({message: validation.messages()})
    }
          const dados = request.only(['nome', 'slug', 'capital', 'regiao'])
          
          const provincia = Provincia.create(dados)

          return provincia

    } catch (error) {
      return response.status(500).send( {error: 'Erro: ${err.message}'} )
    }
  }

  /**
   * Display a single provincia.
   * GET provincias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {

    try {

      const provincia = await Provincia.query().with('municipios').where('id', params.id).first()

      if (!provincia) {
        return response.status(404).send({message: 'Nenhum registro encontrado'})
      }

      return provincia
      
    } catch (error) {
      return response.status(500).send( {error: 'Erro: ${err.message}'} )
    }

    
  }


  /**
   * Update provincia details.
   * PUT or PATCH provincias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {

      const validation = await validateAll(request.all(),  {
        nome: 'min:3|max:20|unique:provincias',
        capital: 'min:3|max:20|unique:provincias',
        regiao: 'min:3'
    })

    if (validation.fails()) {
        return response.status(401).send({message: validation.messages()})
    }

      const {nome, slug, capital, regiao} = request.all()

    const provincia = await Provincia.query().where('id', params.id).first()

    if (!provincia) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    provincia.nome = nome
    provincia.slug = slug
    provincia.capital = capital
    provincia.regiao = regiao

    await provincia.save()

    return provincia 
      
    } catch (error) {
      return response.status(500).send( {error: 'Erro: ${err.message}'} )
    }

     
  }

  /**
   * Delete a provincia with id.
   * DELETE provincias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      
      const provincia = await Provincia.query().where('id', params.id).first()

    if (!provincia) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    await provincia.delete()

    return response.status(200).send({message: 'Deletado com sucesse'})
    } catch (error) {
      return response.status(500).send( {error: 'Erro: ${err.message}'} )
    }
  }
}

module.exports = ProvinciaController
