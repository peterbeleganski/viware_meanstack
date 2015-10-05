app.controller('MainCtrl',function($scope, message, notifier, $location){
    $scope.sendMessage = function(user){
        message.save(user).then(function(){
            notifier.success("Message sent successful!");
            $location.path('/');
        });
    }
});