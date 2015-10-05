require('../models/Message');
var Message = require('mongoose').model('Message');
module.exports = {
    createMessage: function(req,res,next){
        var msgData = req.body;
        Message.create(msgData,function(err,message){
            if(err){
                console.log(err);
                return;
            }
                res.send(message);
        });
    },
    getAllMessages:  function(req,res) {
        Message.find({}).exec(function (err, collection) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(collection);
        });
    },
    deleteMsg : function(req,res,next){
        Message.remove({ _id: req.params.id }, function(err,collection) {
            if (err) {
                return next(err);
            }
            else {
                console.log("deleted");
                res.send(collection);
            }
        });
    }
}











