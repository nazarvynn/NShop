NShop.controller('AdminProductsList', function ($scope, $stateParams, ProductsService) {

    function init_() {
        ProductsService.getProductsByCategory($stateParams.categoryId).then(function (data) {
            $scope.category = data.category;
            $scope.products = data.products;
        });
    }

    init_();
});