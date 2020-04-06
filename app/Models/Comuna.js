'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comuna extends Model {

    comuna(){
        return this.belongsTo('App/Models/Comuna')
    }
}

module.exports = Comuna
