var UsersController = require('../controllers/UsersController');
var CoursesController = require('../controllers/CoursesController');
var MessagesController = require('../controllers/MessagesController');

module.exports = {
    users: UsersController,
    courses: CoursesController,
    messages: MessagesController
}