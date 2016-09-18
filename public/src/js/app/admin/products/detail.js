NShop.controller('AdminProductsDetail', function ($scope, $stateParams, CategoryProductsService) {
    var originalData = {};
    var emptyProduct = {
        name: '',
        price: '',
        description: '',
        ing: ''
    };
    var productId = $stateParams.productId;
    var categoryId = $scope.getCategoryId(productId);

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
        console.log('productId', productId);
        console.log('categoryId', categoryId);

        if (categoryId && productId) {
            CategoryProductsService.getCategoryProduct(categoryId, productId).then(showCategoryProduct);
        }
    }

    function createCategoryProduct() {
        CategoryProductsService.createCategoryProduct(categoryId, $scope.product).then(function (response) {
            if (response._id) {
                clearCategoryProduct();
                $scope.$emit('AdminProductsList.load');
            }
        });
    }

    function updateCategoryProduct() {
        CategoryProductsService.updateCategoryProduct(categoryId, $scope.product).then(function (response) {
            if (response._id) {
                showCategoryProduct(response);
                $scope.$emit('AdminProductsList.load');
            }
        });
    }

    function clearCategoryProduct() {
        $scope.product = ObjUtils.clone(emptyProduct);
    }

    init_();
});