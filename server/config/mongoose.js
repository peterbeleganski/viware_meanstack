var mongoose = require('mongoose'),
    user = require('../models/User'),
    course = require('../models/Course');


module.exports = function(config){
    mongoose.connect(config.development.db);

    var db = mongoose.connection;
    db.once('open',function(err){

        if(err){
            console.log(err);
            return;
        }
        console.log('Database up and running...');
    });

    db.on('error',function(err){
        console.log(err);
    });
    user.seedInitialUsers();
    course.seedInitialCourses();
};






