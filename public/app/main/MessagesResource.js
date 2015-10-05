app.factory('MessagesResource',function($resource){
    var MessagesResource = $resource('/api/messages/:id',{_id:'@id'}, {update: {method:'PUT', isArray:false}});

    return MessagesResource;
});