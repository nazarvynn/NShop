NShop.controller('AdminProductsList', function ($scope, $stateParams, ProductsService) {

    function init_() {
        ProductsService.getProductsByCategory($stateParams.categoryId).then(function (data) {
            $scope.categoryName = data.name;
            $scope.products = data.products;
        });
    }

    init_();
});