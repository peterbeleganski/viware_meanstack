app.factory('message',function($q, MessagesResource){
    return {
        save: function(message){
            var deferred = $q.defer();
            var message = new MessagesResource(message);
            message.$save().then(function(){
                deferred.resolve()
            },function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        },
        delete : function(message){
            var deferred = $q.defer();
            message.$delete({id: message._id}, function(response){
                deferred.resolve()
            }, function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }
});
