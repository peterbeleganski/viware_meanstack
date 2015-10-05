var mongoose = require('mongoose');
var encryption = require('../utilities/encrypt');

var userSchema =  mongoose.Schema({
    username: {type:String, required:true, unique:true},
    salt : String,
    hashPass : String,
    firstName : {type:String, required:true},
    lastName : {type:String, required:true},
    roles:[String]
});


    userSchema.method({
        authenticate:function(password){
            if(encryption.generateHashedPassword(this.salt,password) === this.hashPass){
                return true;
            }else{
                return false;
            }
        }
    });

    var User = mongoose.model('User',userSchema);


module.exports.seedInitialUsers = function(){
    User.find({}).exec(function(err,collection){
        if(err){
            console.log(err);
            return;
        }

        if(collection.length === 0){
            var salt;
            var hashedPwd;
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt,'pepi');
            User.create({username:'pepi',firstName:'Peter',lastName:'Beleganski',salt:salt,hashPass:hashedPwd,roles:['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt,'pesho');
            User.create({username:'pesho',firstName:'pesho',lastName:'peshov',salt:salt,hashPass:hashedPwd, roles:['standard']});
            console.log('Users added to database..');
        };

    });
}
