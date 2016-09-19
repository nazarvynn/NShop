NShop.controller('AdminProductsDetail', function ($scope, $q, $stateParams, CategoryProductsService, CategoriesService) {
    var originalData = {};
    var emptyProduct = {
        name: '',
        price: '',
        description: '',
        ing: ''
    };
    $scope.productId = $stateParams.productId;
    $scope.selectedCategory = $scope.getCategoryId($scope.productId);

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
        } else {
            CategoriesService.getCategories().then(function (categories) {
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
        console.log('productId', $scope.productId);
        console.log('categoryId', $scope.selectedCategory);

        if ($scope.selectedCategory && $scope.productId) {
            var categoryProductP = CategoryProductsService.getCategoryProduct($scope.selectedCategory, $scope.productId);
            var categoriesP = CategoriesService.getCategories();

            $q.all([categoryProductP, categoriesP]).then(function (responses) {
                var product = responses[0];
                var categories = responses[1];
                showCategoryProduct(product, categories);
            });
        }
    }

    function createCategoryProduct() {
        CategoryProductsService.createCategoryProduct($scope.selectedCategory, $scope.product).then(function (response) {
            if (response._id) {
                clearCategoryProduct();
                $scope.$emit('AdminProductsList.load');
            }
        });
    }

    function updateCategoryProduct() {
        CategoryProductsService.updateCategoryProduct($scope.selectedCategory, $scope.product).then(function (response) {
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