NShop.controller('AdminCategoryProductsList', function ($scope, $stateParams, CategoryProductsService) {

    function init_() {
        CategoryProductsService.getCategoryProducts($stateParams.categoryId).then(function (data) {
            $scope.categoryName = data.name;
            $scope.products = data.products;
        });
    }

    init_();
});