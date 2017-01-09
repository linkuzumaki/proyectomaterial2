const   expres=require('express'),
        router=expres.Router(),
        Elementos=require('./model_elemento');

module.exports=function (app) {
     // guardar elementos

    //funcion POST
    addElementos=function (req,res) {
        console.log(req.body)

        var elementos=new Elementos({
            idform:req.body.idform,
            nameform:req.body.nameform,
            elements:{
                idelement:req.body.idelement,
                element:req.body.element,
            }
        });

        elementos.save(function (err) {
            if(!err) {
                console.log("datos created");
                //return res.send({ status: 'OK', datos:datos });
                res.redirect('/index.html')
            } else {
                console.log(' datos no guardados'+err);
            }

        })


    }
    obtnerall=function (req,res) {
        console.log("GET - /datos");
        return Elementos.find(function(err,elementos){
            if(!err){
                return res.send(elementos);
            }else {

                console.log('Internal error(%d): %s',res.statusCode,err.message);

            }
        })
    }
    app.get('/elemento',obtnerall);
    app.post('/elemento',addElementos);


}