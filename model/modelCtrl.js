const   expres=require('express'),
        router=expres.Router(),
        Elementos=require('./modelejemplo');
module.exports=function (app) {
    guardardatos = function (req, res, next) {

        var elementos = new Elementos({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
        })
        elementos.save(function (err) {
            if (!err) {
                console.log("datos created");
                //return res.send({ status: 'OK', datos:datos });
                res.send(err);
                //res.redirect('/index.html')
            } else {
                console.log(' datos no guardados' + err);
                res.send(elementos);
            }

        })

    }
    obtnerall=function (req,res) {
        console.log("GET - /datos");
        return Elementos.find(function(err,elementos){
            if(!err){
                return res.json(elementos);
            }else {
                res.status(500).send(err)

            }
        })
    }
    actualizar=function (req, res, next) {
        console.log("put - /datos");
        console.log(req.params.id)
        var id = req.params.id
        Elementos.findById(req.params.id, function(error,elemento){
            if(error){
                res.status(500).send(err);
                console.log('error al enviar')
            }else{
                console.log('entro al enviar')
                console.log(req.body.nombre||elemento.nombre)
                elemento.nombre=req.body.nombre||elemento.nombre;
                elemento.apellido=req.body.apellido ||elemento.apellido;
                elemento.save(function(error){
                    if(error){
                        console.log(error)
                    }else{
                        console.log('save')
                        res.send(elemento);
                    }
                });
            }

        });


    }
    eliminardatos =function (req, res, next) {
        console.log(req.params.id)
        var id = req.params.id
        Elementos.findByIdAndRemove(req.params.id, function (err, elemento) {
            var response = {
                message: "Todo successfully deleted",
                id: elemento._id
            };
            res.send(response);
        });
    }
    app.post('/ejemplo/eliminar/:id',eliminardatos)
    app.post('/ejemplo/:id',actualizar );
    app.get('/ejemplo', obtnerall)
    app.post('/ejemplo', guardardatos);
}