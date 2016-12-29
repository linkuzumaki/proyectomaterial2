var expres = require('express');
var router=expres.Router();
var Datos = require('./modelejemplo');

module.exports = function(app) {
    //insertar datos
    addDatos = function(req, res) {
        console.log('POST - /datos');
        console.log(req.body);
        var datos = new Datos({
            nombre:    req.body.nombre,
            apellido :  req.body.apellido,
        });
        datos.save(function(err) {
            if(!err) {
                console.log("datos created");
                //return res.send({ status: 'OK', datos:datos });
                res.redirect('/index.html')
            } else {
                console.log(err);
            }
        });
    };
    //obtner todos los datos
    obtnerallDatos=function (req,res) {
        console.log("GET - /datos");
        return Datos.find(function(err,datos){
            if(!err){
                return res.send(datos);
            }else {

                console.log('Internal error(%d): %s',res.statusCode,err.message);

            }
        })
    }

    app.get('/ejemplo', obtnerallDatos);
    app.post('/ejemplo', addDatos);

}
