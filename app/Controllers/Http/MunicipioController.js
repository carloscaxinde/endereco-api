'use strict'

const Municipio = use('App/Models/Municipio')
const Database = use('Database')

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
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    //const municipio = await Municipio.query().fetch()
    //const municipio = await Municipio.query().with('provincia').fetch()
    const municipios = await Database.select('id','nome', 'slug').from('municipios')

    return municipios
  }

  async municipioProvincia(params){
    
    const municipios = await Database.select('id','nome', 'slug').from('municipios').where('provincia_id', params.id)

    return municipios
  }

  /**
   * Create/save a new municipio.
   * POST municipios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {

      const dados = request.only(['nome', 'slug', 'provincia_id'])
      
      const municipio = Municipio.create(dados)

      return municipio

} catch (error) {
  return response.status(500).send( {error: 'Erro: ${err.message}'} )
}
  }

  /**
   * Display a single municipio.
   * GET municipios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {

    const municipio = await Municipio.query().where('id', params.id).first()

    if (!municipio) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    return municipio
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

    const {nome, slug, provincia_id} = request.all()

    const municipio = await Municipio.query().where('id', params.id).first()

    if (!municipio) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    municipio.nome = nome
    municipio.slug = slug
    municipio.provincia_id = provincia_id

    await municipio.save()

    return municipio
  }

  /**
   * Delete a municipio with id.
   * DELETE municipios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const municipio = await Municipio.query().where('id', params.id).first()

    if (!municipio) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    await municipio.delete()

    return response.status(200).send({message: 'Deletado com sucesse'})
  }
}

module.exports = MunicipioController
