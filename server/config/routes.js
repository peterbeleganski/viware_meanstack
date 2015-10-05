var passport = require('passport'),
    auth = require('./auth'),
    controllers = require('../controllers'),
    mongoose = require('mongoose');

var User = mongoose.model('User');
module.exports = function(app){

    app.get('/api/users', controllers.users.getAllUsers);

    app.post('/api/users',controllers.users.createUser);
    app.put('/api/users',auth.authenticate, controllers.users.updateUser);

    app.get("/partials/:partialArea/:partialName",function(req,res){
        res.render('../../public/app/'+req.params.partialArea+'/'+ req.params.partialName);
    });

    app.get('/api/courses', controllers.courses.getAllCourses);
    app.post('/api/courses',auth.authenticate, controllers.courses.createCourse);

    app.post('/api/messages', controllers.messages.createMessage);
    app.get('/api/messages',auth.isInRole('admin'), controllers.messages.getAllMessages);
    app.delete('/api/messages/:id',auth.isInRole('admin'), controllers.messages.deleteMsg);

    app.get('/api/courses/:id', controllers.courses.getCourseById);
    app.delete('/api/courses/:id',auth.isInRole('admin'), controllers.courses.deleteCourse);

    app.get('/api/*', function(req,res){
        res.status(404);
        res.end();
    });
    app.get('*',function(req,res){
        res.render('index',{currentUser:req.user});
    });

    app.post('/login',auth.login);
    app.post('/logout', auth.logout);
}