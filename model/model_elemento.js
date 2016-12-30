var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Elemento = new Schema({
    idform:   { type: String, required: true  },
    nameform:  { type: String, required: true  },
    elements:{
        idelement:{type: String, required: true },
        element:{type: String, required: true }
    }
})

module.exports = mongoose.model('Elemento', Elemento);
