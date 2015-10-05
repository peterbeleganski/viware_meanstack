app.controller('AddMessageCtrl',function($scope, message, $location, notifier){
    $scope.sendMessage = function(user){
        message.save(user).then(function(){
            notifier.success("Message sent successful!");
            $location.path('/');
        });
    }
});