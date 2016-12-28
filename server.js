//server.js
const   express = require("express"),
        app = express(),
        bodyParser  = require("body-parser"),
        methodOverride = require("method-override");
        mongoose = require('mongoose');
var Datos = require('./model/modelejemplo.js');
mongoose.connect('mongodb://localhost:27017/proyectodb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/bower_components'));




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


var router = express.Router();


app.listen(3000, function() {
    console.log('App listening on port 3000');
});



























/*
const express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    MongoCliente=require('mongodb').MongoClient;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(express.static(__dirname + '/app'));
    app.use(express.static(__dirname + '/bower_components'));
    var router = express.Router();
    var db



    MongoCliente.connect('mongodb://localhost:27017/proyectodb',function (err, database){
        if (err) return console.log(err)
        db = database
        app.listen(3000,function (){
             console.log('listening on 3000')
        })
    })

 app.get('/main',function(req, res) {
        db.collection('datos').find().toArray(function (err,results) {
            console.log(results);
        })
    })
  app.post('/main',function (req, res) {
      db.collection('datos').save(req.body,function (err,result) {
          if(err)return console.log(err)
          console.log('save db')
          res.redirect('/')
      })
    });
app.use(router);
    */