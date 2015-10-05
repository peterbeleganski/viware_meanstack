app.controller('SignupCtrl',function($scope, auth, $location, notifier){
    $scope.signUp = function(user){
        auth.signUp(user).then(function(){
            notifier.success("Account created successful!");
            $location.path('/');
        });
    }
});