app.controller('CourseDetailsCtrl', function($scope, $routeParams, CourseResource, $sce){
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    $scope.course = CourseResource.get({id : $routeParams.id})
});