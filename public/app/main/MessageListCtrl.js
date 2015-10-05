app.controller('MessageListCtrl', function($scope, MessagesResource, message, notifier,$location){
    $scope.messages = MessagesResource.query();

    $scope.isActive = function(id){
        if(id == undefined){
            return false;
        }
        return true;
    };

    $scope.remove = function(msg){
        console.log(msg);

        message.delete(msg).then(function(){
            notifier.success("Deleted successful!");
            $location.path('/admin-messages');
        });
    };
});