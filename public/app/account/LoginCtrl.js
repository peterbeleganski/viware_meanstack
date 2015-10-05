app.controller('LoginCtrl',function($scope, $location, notifier, identity, auth){

    $scope.identity = identity;

    $scope.login = function(user){
        auth.login(user).then(function(success){
            if(success){
                notifier.success("Successful login");
            }else{
                notifier.err("Username or Password not valid");
            }
        });
    };
    $scope.logout = function(){
        auth.logout().then(function(){
                notifier.success("Successful log out!");
                if($scope.user.username !== undefined && $scope.user.password !== undefined){
                     $scope.user.username = '';
                     $scope.user.password = '';
                }
                $location.path('/');
        });
    };
    $scope.showModal = false;
    $scope.showLogin = function(){
        $scope.showModal = true;
    }

});