var Datos = require('./model/modelejemplo.js');

// create a new user
var nuevoDato = Datos({
    title: req.body.quote,
    country:req.body.name,

});

// save t
nuevoDato.save(function(err) {
    if (err) throw err;

    console.log('dat created!');
});
