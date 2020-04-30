'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvinciaSchema extends Schema {
  up () {
    this.create('provincias', (table) => {
      table.increments()
      table.string('nome', 45).notNullable().unique()
      table.string('capital', 45).notNullable().unique()
      table.string('regiao')
      table.timestamps()
    })
  }

  down () {
    this.drop('provincias')
  }
}

module.exports = ProvinciaSchema
