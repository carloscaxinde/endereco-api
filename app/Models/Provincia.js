'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Provincia extends Model {

    municipios(){
        return this.hasMany('App/Models/Municipio')
    }
}

module.exports = Provincia
