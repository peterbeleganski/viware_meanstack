app.factory('course',function($q, CourseResource){
    return {
        save: function(course){
            var deferred = $q.defer();
            var course = new CourseResource(course);
            course.$save().then(function(){
                deferred.resolve()
            },function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        },
        delete : function(course){
            var deferred = $q.defer();
            course.$delete({id: course._id}, function(response){
                deferred.resolve()
            }, function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }
});
