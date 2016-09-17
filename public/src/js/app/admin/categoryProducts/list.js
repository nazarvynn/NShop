NShop.controller('AdminCategoryProductsList', function ($scope, $stateParams, CategoryProductsService) {
    var categoryId = $stateParams.categoryId;

    $scope.removeProduct = function (product) {
        var isOk = confirm('Are you really want to remove "' + product.name + '" category?');
        if (isOk) removeProduct(product._id);
    };

    $scope.$on('AdminCategoryProductsList.load', loadList);

    function init_() {
        $scope.activeItem = 'categories';
        loadList();
    }

    function loadList() {
        CategoryProductsService.getCategoryProducts(categoryId).then(function (data) {
            $scope.categoryName = data.name;
            $scope.products = data.products;
        });
    }

    function removeProduct(productId) {
        CategoryProductsService.removeCategoryProduct(categoryId, productId).then(function (data) {
            if (data.ok) loadList();
        });
    }

    init_();
});