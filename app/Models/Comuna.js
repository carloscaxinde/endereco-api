'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comuna extends Model {

    municipio(){
        return this.belongsTo('App/Models/Municipio')
    }
}

module.exports = Comuna
