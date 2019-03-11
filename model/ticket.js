var mongoose = require('mongoose');
var ticketSchema = new mongoose.Schema({
    t_id: String,
    latitude: String,
    longitude: String,
    timestamp: Date
});
mongoose.model('ticket', ticketSchema);
