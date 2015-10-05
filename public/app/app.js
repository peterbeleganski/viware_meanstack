var app = angular.module('app',['ngResource','ngRoute','ui.bootstrap']).value('toastr',toastr);
app.controller('LoginCtrl',function($scope, $location, notifier, identity, auth, $modal , $log){
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.identity = identity;
    $scope.logout = function(){
        auth.logout().then(function(){
            notifier.success("Successful log out!");
            $location.path('/courses');
            if(typeof $scope.user.username == undefined && typeof $scope.user.password == undefined){
                $scope.user.username = '';
                $scope.user.password = '';
            }
        });
    };
});

app.controller('ModalInstanceCtrl', function($scope,$modalInstance, items, auth, notifier){
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function (user) {
        //$modalInstance.close($scope.selected.item);
        auth.login(user).then(function(success){
            if(success){
                $modalInstance.dismiss('cancel');
                notifier.success("Successful login");
            }else{
                notifier.err("Username or Password not valid");
            }
        });

    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


app.config(function($routeProvider, $locationProvider){
   // $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };
    $routeProvider
    .when('/',{
            templateUrl: '/partials/main/home',
            controller : 'MainCtrl'
    }).when('/courses',{
            templateUrl: '/partials/courses/courses-list',
            controller : 'CoursesListCtrl'
    })
    .when('/courses/:id',{
            templateUrl: '/partials/courses/course-details',
            controller : 'CourseDetailsCtrl',
            resolve:routeUserChecks.authenticated
    })
    .when('/admin-courses',{
            templateUrl: '/partials/courses/admin-courses',
            controller : 'AdminCoursesCtrl',
            resolve: routeUserChecks.adminRole
    })
    .when('/add-course',{
            templateUrl: '/partials/courses/add-course',
            controller : 'AddCourseCtrl',
            resolve: routeUserChecks.adminRole
    })
    .when('/profile',{
            templateUrl: '/partials/account/profile',
            controller : 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
    })
    .when('/admin-messages',{
            templateUrl: '/partials/main/messages-list',
            controller : 'MessageListCtrl',
            resolve: routeUserChecks.adminRole
    })
    .when('/signup',{
            templateUrl:'/partials/account/signup',
            controller:'SignupCtrl'
    }).when('/admin/users',{
            templateUrl:'/partials/admin/users-list',
            controller:'UserListCtrl',
            resolve: routeUserChecks.adminRole
    })
});

app.run(function($rootScope, $location, notifier) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            notifier.warning('You have to login first!')

        }
    })
});


