'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComunaSchema extends Schema {
  up () {
    this.create('comunas', (table) => {
      table.increments()
      table.string('nome', 45).notNullable().unique()
      table.integer('municipio_id').unsigned().references('id').inTable('municipios').onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('comunas')
  }
}

module.exports = ComunaSchema
