NShop.controller('AdminProductsList', function ($scope, $stateParams, ProductsService, CategoryProductsService) {

    $scope.removeProduct = function (product) {
        var isOk = confirm('Are you really want to remove "' + product.name + '" category?');
        if (isOk) removeProduct(product);
    };

    $scope.$on('AdminProductsList.load', loadList);

    $scope.getCategoryId = function (productId) {
        var product = ($scope.products || []).filter(function (product) {
            return productId === product.data._id;
        });

        return product && product[0] && product[0].categoryId;
    };

    function init_() {
        $scope.activeItem = 'products';
        loadList();
    }

    function loadList() {
        ProductsService.getProducts().then(function (data) {
            $scope.products = data;
        });
    }

    function removeProduct(product) {
        CategoryProductsService.removeCategoryProduct(product.categoryId, product.data._id).then(function (data) {
            if (data.ok) loadList();
        });
    }

    init_();
});