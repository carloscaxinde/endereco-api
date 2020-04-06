'use strict'

const Comuna = use('App/Models/Comuna')
const Database = use('Database')
const  { validateAll } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comunas
 */
class ComunaController {
  /**
   * Show a list of all comunas.
   * GET comunas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const comunas = await Database.select('id','nome', 'slug').from('comunas')

      if (!comuna) {
        return response.status(404).send({message: 'Nenhum registro encontrado'})
      }

      return comunas

    } catch (error) {
      return response.status(500).send( {error: 'Erro: ${err.message}'} )
    }
  }

  /**
   * Create/save a new comuna.
   * POST comunas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    try {

      const validation = await validateAll(request.all(),  {
        nome: 'required|min:3|max:30|unique:comunas',
        municipio_id: 'required|number'
    })

    if (validation.fails()) {
      return response.status(401).send({message: validation.messages()})
  }

      const dados = request.only(['nome', 'slug', 'municipio_id'])
      
      const comuna = Comuna.create(dados)

      return comuna

} catch (error) {
  return response.status(500).send( {error: 'Erro: ${err.message}'} )
}
  }

  /**
   * Display a single comuna.
   * GET comunas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {

    try {
      const comuna = await Comuna.query().where('id', params.id).first()

    if (!comuna) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    return comuna
    } catch (error) {
  return response.status(500).send( {error: 'Erro: ${err.message}'} )
      
    }
  }

  /**
   * Update comuna details.
   * PUT or PATCH comunas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {
      const {nome, slug, municipio_id} = request.all()

    const comuna = await Comuna.query().where('id', params.id).first()

    if (!comuna) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    comuna.nome = nome
    comuna.slug = slug
    comuna.municipio_id = municipio_id

    await comuna.save()

    return comuna
    } catch (error) {
      return response.status(500).send( {error: 'Erro: ${err.message}'} )
    }
  }

  /**
   * Delete a comuna with id.
   * DELETE comunas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    try {
      const comuna = await Comuna.query().where('id', params.id).first()

    if (!comuna) {
      return response.status(404).send({message: 'Nenhum registro encontrado'})
    }

    await comuna.delete()

    return response.status(200).send({message: 'Deletado com sucesse'})
    } catch (error) {
      return response.status(500).send( {error: 'Erro: ${err.message}'} )
    }
  }
}

module.exports = ComunaController
