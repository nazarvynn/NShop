NShop.controller('AdminProductsDetail', function ($scope, $q, $stateParams, CategoryProductsService, CategoriesService) {
    var originalData = {};
    var emptyProduct = {
        name: '',
        price: '',
        description: ''
    };
    $scope.productId = $stateParams.productId;

    $scope.onSubmit = function () {
        $scope.productId = $scope.product._id;
        ($scope.productId && 'create' !== $scope.productId) ? updateCategoryProduct() : createCategoryProduct();
    };

    $scope.onReset = function () {
        $scope.product = ObjUtils.clone(originalData);
    };

    $scope.onClear = clearCategoryProduct;

    function init_() {
        if ('create' !== $scope.productId) {
            getCategoryProduct();
            $scope.$on('AdminProductsList.loaded', getCategoryProduct);
        } else {
            CategoriesService.getCategories()
                .then(function (categories) {
                    $scope.categories = categories;
                });
        }
    }

    function showCategoryProduct(product, categories) {
        originalData = ObjUtils.clone(product);
        $scope.product = product;
        $scope.categories = categories;
    }

    function getCategoryProduct() {
        $scope.categoryId = $scope.getCategoryId($scope.productId);
        if (!$scope.categoryId) return;

        if ($scope.categoryId && $scope.productId) {
            var categoryProductP = CategoryProductsService.getCategoryProduct($scope.categoryId, $scope.productId);
            var categoriesP = CategoriesService.getCategories();

            $q.all([categoryProductP, categoriesP])
                .then(function (responses) {
                    var product = responses[0];
                    var categories = responses[1];
                    showCategoryProduct(product, categories);
                });
        }
    }

    function createCategoryProduct() {
        CategoryProductsService.createCategoryProduct($scope.categoryId, $scope.product)
            .then(function (response) {
                if (response._id) {
                    clearCategoryProduct();
                    $scope.$emit('AdminProductsList.load');
                }
            });
    }

    function updateCategoryProduct() {
        CategoryProductsService.updateCategoryProduct($scope.categoryId, $scope.product, isEntireUpdate())
            .then(function (response) {
                if (response._id) {
                    showCategoryProduct(response);
                    $scope.$emit('AdminProductsList.load');
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