'use strict'

const Municipio = use('App/Models/Municipio')
const Database = use('Database')
const  { validateAll } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with municipios
 */
class MunicipioController {
  /**
   * Show a list of all municipios.
   * GET municipios
   *
   * @param {Response} ctx.response
   */
  async index ({ response }) {
   try {
     
    const municipios = await Municipio.query().with('comunas').with('provincia').fetch()

    if (!municipios) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    return municipios

   } catch (error) {
    return response.status(500).send( {error: error.message} )
   }
  }

  /**
   * Create/save a new municipio.
   * POST municipios
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {

      const validation = await validateAll(request.all(),  {
        nome: 'required|min:3|max:30|unique:municipios',
        provincia_id: 'required|number'
    })

    if (validation.fails()) {
      return response.status(401).send({message: validation.messages()})
  }

      const dados = request.only(['nome', 'provincia_id'])
      
      const municipio = Municipio.create(dados)

      return municipio

} catch (error) {
  return response.status(500).send( {error: error.message} )
}
  }

  /**
   * Display a single municipio.
   * GET municipios/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {

    try {

      const municipio = await Municipio.query().with('comunas').with('provincia').where('id', params.id).first()

    if (!municipio) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    return municipio
      
    } catch (error) {
      return response.status(500).send( {error: error.message} )
    }
  }


  /**
   * Update municipio details.
   * PUT or PATCH municipios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {
      const {nome, provincia_id} = request.all()

    const municipio = await Municipio.query().where('id', params.id).first()

    if (!municipio) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    municipio.nome = nome
    municipio.provincia_id = provincia_id

    await municipio.save()

    return municipio
    } catch (error) {
      return response.status(500).send( {error: error.message} )
    }
  }

  /**
   * Delete a municipio with id.
   * DELETE municipios/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {

    try {
      const municipio = await Municipio.query().where('id', params.id).first()

    if (!municipio) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    await municipio.delete()

    return response.status(200).send({message: 'Deletado com sucesse'})
    } catch (error) {
      return response.status(500).send( {error: error.message} )
    }
  }
}

module.exports = MunicipioController
