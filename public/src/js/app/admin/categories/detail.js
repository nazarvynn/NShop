NShop.controller('AdminCategoriesDetail', function ($scope, $stateParams, CategoriesService) {

    function init_() {
        CategoriesService.getCategory($stateParams.categoryId).then(function (data) {
            $scope.category = data;
        });
    }

    init_();
});