var NShop = angular.module('NShop', ['ngRoute']);

NShop.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,      // set HTML5 mode
        requireBase: false
    });

    $routeProvider
        .when('/test', {
            controller: 'DashboardController',
            templateUrl: 'views/test.html'
        })
        .when('/', {
            controller: 'MyTestCtrl',
            templateUrl: 'views/main.html'
        })
        .otherwise('/');
});

NShop.controller('MyTestCtrl', function ($scope) {
    self = $scope;
    self.val = 'TeSt';
    self.counter = 0;
    var self = self;
    self.clicked = function() {
        self.counter++;
    };
});