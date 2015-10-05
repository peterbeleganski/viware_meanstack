var mongoose = require('mongoose');

var courseSchema =  mongoose.Schema({
    title: String,
    featured: {required: false},
    published: Date,
    tag:String,
    img:{type: String, required: false},
    instructor: String,
    url:{type: String, required: true}
});

var Course = mongoose.model('Course',courseSchema);

module.exports.seedInitialCourses = function() {
    Course.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find courses: ' + err);
            return;
        }

        if (collection.length === 0) {
            Course.create({title: 'What Most Schools Don\'t Teach',img:'/img/course.png',instructor: "Pepi", featured: true, published: new Date(), tag: 'Inspiration video',url:"https://www.youtube.com/embed/nKIu9yen5nc"});
            Course.create({title: '"Code Stars" - Short Film',img:'/img/course.png',instructor: "Pepi", featured: true, published: new Date(), tag: 'Inspiration video',url:"https://www.youtube.com/embed/dU1xS07N-FA"});

        }
    });
};