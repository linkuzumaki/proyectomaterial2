
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Datos = new Schema({
    nombre:    { type: String },
    apellido:  { type: String },

})

module.exports = mongoose.model('Datos', Datos);