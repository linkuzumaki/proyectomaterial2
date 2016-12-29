//server.js
//Incluímos las dependencias que vamos a usar
const   express=require('express'),
        app= express(),
        bodyParser  = require("body-parser"),
        methodOverride = require("method-override");
        mongoose=require('mongoose'),
        log= require('./app/libs/log')(module),

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));

routes = require('./model/modelCtrl.js')(app);


// Conexión
mongoose.connect('mongodb://localhost:27017/proyectodb', function(err, database) {
    if (err) return console.log(err)
    db = database
    app.listen(3000,function (){
        console.log('listening on 3000')
    })
});

















/*const   express = require("express"),
        app = express(),
        bodyParser  = require("body-parser"),
        methodOverride = require("method-override");
        mongoose = require('mongoose');
var Datos = require('./model/modelejemplo.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));

mongoose.connect('mongodb://localhost:27017/proyectodb',function (err, database){
    if (err) return console.log(err)
    db = database
    app.listen(3000,function (){
        console.log('listening on 3000')
    })
})



app.post('/main', function(req, res) {
    Datos.create({
        title: req.body.quote,
        country:req.body.name,

    }, function(err, main){
        if(err) {
            res.send(err);
        }

        Datos.find(function(err, main) {
            if(err){
                res.send(err);
            }
            res.json(main);
        });
    });
});
var router = express.Router();*/
















