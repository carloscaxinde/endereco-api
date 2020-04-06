'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Municipio extends Model {

    comunas(){
        return this.hasMany('App/Models/Comuna')
    }

    provincia(){
        return this.belongsTo('App/Models/Provincia')
    }
}

module.exports = Municipio
