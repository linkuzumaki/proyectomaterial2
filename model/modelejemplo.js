var mongoose = require('mongoose')
    Schema   = mongoose.Schema;

var datos = new Schema({
    title:    { type: String },
    country:  { type: String },
})
var User = mongoose.model('Datos', datos);
module.exports = User;


