var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3000/blobs if the default route for / is left unchanged
router.route('/')
//GET all blobs
    .get(function(req, res, next) {
        //res.send({"a_id": "something"});

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("RCMN");
            dbo.collection("alerts").find({ }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
                db.close();
            });
        });






    });

module.exports = router;
