//MQTT Dependencies

var mqtt = require('mqtt');
var client  = mqtt.connect('<Broker Address>');

//MongoDB Dependencies
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Express and Socket.io Dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname + '/client', 'index.html'));
});

client.on('connect', function () {
    client.subscribe('<sub_topic>', function (err) {
        if (!err) {
            client.publish('init', 'Server Online');
        }
    })
});

client.on('message', function (topic, message) {
    // message is Buffer
    handleMessage(topic, message);
});

function handleMessage(topic, message) {

    var msg = message.toString();
    console.log(msg);

    client.end()
}
