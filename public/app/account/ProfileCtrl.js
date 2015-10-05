app.controller('ProfileCtrl',function($scope, identity, auth, $location, notifier){
    $scope.user = {
        firstName : identity.currUser.firstName,
        lastName : identity.currUser.lastName
    },
    $scope.update = function(user){
        auth.update(user).then(function(){
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            notifier.success("Profile updated!");
            $location.path('/');
        });
    }
});