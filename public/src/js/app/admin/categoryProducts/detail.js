NShop.controller('AdminCategoryProductsDetail', function ($scope, $stateParams, CategoryProductsService) {
    var originalData = {};
    var emptyProduct = {
        name: '',
        price: '',
        description: ''
    };
    var categoryId = $stateParams.categoryId;
    var productId = $stateParams.productId;

    $scope.onSubmit = function () {
        var productId = $scope.product._id;
        (productId && 'create' !== productId) ? updateCategoryProduct() : createCategoryProduct();
    };

    $scope.onReset = function () {
        $scope.product = ObjUtils.clone(originalData);
    };

    $scope.onClear = clearCategoryProduct;

    function init_() {
        if ('create' !== productId) getCategoryProduct();
    }

    function showCategoryProduct(data) {
        originalData = ObjUtils.clone(data);
        $scope.product = data;
    }

    function getCategoryProduct() {
        CategoryProductsService.getCategoryProduct(categoryId, productId)
            .then(showCategoryProduct);
    }

    function createCategoryProduct() {
        CategoryProductsService.createCategoryProduct(categoryId, $scope.product)
            .then(function (response) {
                if (response._id) {
                    clearCategoryProduct();
                    $scope.$emit('AdminCategoryProductsList.load');
                }
            });
    }

    function updateCategoryProduct() {
        CategoryProductsService.updateCategoryProduct(categoryId, $scope.product, isEntireUpdate())
            .then(function (response) {
                if (response._id) {
                    showCategoryProduct(response);
                    $scope.$emit('AdminCategoryProductsList.load');
                }
            });
    }

    function isEntireUpdate() {
        return ObjUtils.isEqualObjects(originalData, $scope.product, ['_id']);
    }

    function clearCategoryProduct() {
        $scope.product = ObjUtils.clone(emptyProduct);
    }

    init_();
});