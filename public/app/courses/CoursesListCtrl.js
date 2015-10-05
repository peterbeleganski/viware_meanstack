app.controller('CoursesListCtrl', function($scope, CourseResource){
    $scope.courses = CourseResource.query();
});