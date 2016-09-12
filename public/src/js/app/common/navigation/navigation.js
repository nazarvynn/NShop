NShop.controller('Navigation', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        var path = $location.path();
        var regexp = '^\/admin\/' + viewLocation + '(/.*)?$';
        return new RegExp(regexp, 'gi').test(path);
    };
});