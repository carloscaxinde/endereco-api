'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MunicipioSchema extends Schema {
  up () {
    this.create('municipios', (table) => {
      table.increments()
      table.string('nome', 45).notNullable().unique()
      table.integer('provincia_id').unsigned().references('id').inTable('provincias').onUpdate('CASCADE').onDelete('CASCADE')
      
    })
  }

  down () {
    this.drop('municipios')
  }
}

module.exports = MunicipioSchema
