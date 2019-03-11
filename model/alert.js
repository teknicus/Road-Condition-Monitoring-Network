var mongoose = require('mongoose');
var alertSchema = new mongoose.Schema({
    a_id: String,
    dev_id: String,
    latitude: String,
    longitude: String,
    amplitude: String
});
mongoose.model('alert', alertSchema);
