//MQTT Dependencies

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');

//MongoDB Dependencies
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Express and Socket.io Dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var  alert = require('./model/alert');
var  ticket = require('./model/ticket');


var dev_id = "init";
var lat = "init";
var long = "init";
var amp = "init";

var id = 0;
var str = "undefined";
const { convertCSVToArray } = require('convert-csv-to-array');
const converter = require('convert-csv-to-array');

app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname + '/client', 'index.html'));
});

    client.on('connect', function () {
        client.subscribe('message', function (err) {
            if (!err) {
                client.publish('init', 'Server Online');
            }
        })
    });

client.on('message', function (topic, message) {
    // message is Buffer
    console.log("triggered");
    client.publish('init', message);
    handleMessage(topic, message);
});

function handleMessage(topic, message) {

    var msg = message.toString();
    console.log('message: ' + msg);
    //  socket.emit('passenger', 'received');
    const arrayofObjects = convertCSVToArray(msg, {
        separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
    });
    dev_id = arrayofObjects[0][0];
    lat = arrayofObjects[0][1];
    long = arrayofObjects[0][2];
    amp = arrayofObjects[0][3];

    id++;
    var a = id.toString();
    a_id = 'A' + a;

    console.log('Alert ID: ' + a_id);
    console.log('Device ID: ' + dev_id);
    console.log('Lattitude: ' + lat);
    console.log('Longitude: ' + long);
    console.log('Amplitude: ' + amp);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("RCMN");
        var myobj = {
            "a_id": a_id,
            "dev_id": dev_id,
            "latitude": lat,
            "longitude": long,
            "amplitude": amp
            };
        dbo.collection("alerts").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        temp = a_id;
        temp = temp.concat(",");
        temp = temp.concat(dev_id);
        temp = temp.concat(",");
        temp = temp.concat(lat);
        temp = temp.concat(",");
        temp = temp.concat(long);
        temp = temp.concat(",");
        temp = temp.concat(amp);

        console.log("sending to WebUI" + temp);
        //socket.emit('alerts', temp);



    });

    //client.end()
}


http.listen(3000, function(){
    console.log('Web server Active listening on *:3000');

});
