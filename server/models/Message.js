var mongoose = require('mongoose');

var messageSchema =  mongoose.Schema({
    firstName: String,
    lastName: String,
    message: String,
    email: String,
    date: {type: Date, default:new Date()}
});

var Message = mongoose.model('Message',messageSchema);



