app.controller('AddCourseCtrl',function($scope, course, $location, notifier){
    $scope.addCourse = function(video){
        course.save(video).then(function(){
            notifier.success("Video created successful!");
            $location.path('/admin-courses');
        });
    }
});