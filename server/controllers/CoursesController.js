var Course = require('mongoose').model('Course');

module.exports = {
    getAllCourses:  function(req,res){
        Course.find({}).exec(function(err,collection){
            if(err){
                console.log(err);
                return;
            }
            res.send(collection);
        });
    },
    getCourseById : function (req,res,next) {
        Course.findOne({_id: req.params.id}).exec(function(err, course){
           if(err){
               console.log(err);
               return;
           }
            res.send(course);
        });
    },
    createCourse: function(req,res,next){
        var courseData = req.body;
        if(courseData.img === "" || undefined === typeof (courseData.img)){
            courseData.img= "/img/course.png";
        }
        Course.create(courseData,function(err,course){
            if(err){
                console.log(err);
                return;
            }
                res.send(course);
        });
    },
    deleteCourse : function(req,res,next){
        Course.remove({ _id: req.params.id }, function(err,collection) {
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
