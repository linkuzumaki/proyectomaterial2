const   expres=require('express'),
        router=expres.Router(),
        Elementos=require('./modelejemplo');
module.exports=function (app) {
    guardardatos = function (req, res, next) {
        var elementos = new Elementos(req.body);
            elementos.save().then(function() {
                res.send("datos guardados correctamente")
                
            }),function (err) {
                console.log(String(err));
                res.send("error al guardar los datos")
            }

    }
    obtnerall=function (req,res) {
        console.log("GET - /datos");
        Elementos.find().then(function (elementos) {
            res.send(elementos);
        }),function (err) {
            res.status(500).send(err)
        }
    }

    actualizar=function (req, res, next) {
        console.log("put - /datos");
        console.log(req.params.id)
        var id = req.params.id
            elementos = new Elementos(req.body);
            Elementos.findByIdAndUpdate(id,{$set:req.body}).then(function (elemento) {
                console.log(elemento)
            }),function (err) {
                res.status(500).send(err)
            }

    }
    eliminardatos =function (req, res, next) {
        console.log(req.params.id)
        var id = req.params.id

        Elementos.findByIdAndRemove(id).then(function (elemento) {
            var response = {
                message: "Todo successfully deleted",
                id: elemento._id
            };
            res.send(response);
        }),function (err) {
            res.status(500).send(err)
        }

    }
    app.post('/ejemplo/eliminar/:id',eliminardatos)
    app.post('/ejemplo/:id',actualizar );
    app.get('/ejemplo', obtnerall)
    app.post('/ejemplo', guardardatos);
}