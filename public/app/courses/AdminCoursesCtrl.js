app.controller('AdminCoursesCtrl', function($scope, CourseResource, course, notifier, $location){
    $scope.courses = CourseResource.query();

    $scope.remove = function(video){
        console.log(video);

        course.delete(video).then(function(){
            notifier.success("Video deleted successful!");
$location.path('/admin-courses');
});
};
$scope.isActive = function(id){
    if(id == undefined){
        return false;
    }
    return true;
};

});