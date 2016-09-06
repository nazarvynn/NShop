NShop.controller('AdminCategoriesList', function ($scope, CategoriesService) {

    function init_() {
        CategoriesService.getCategories().then(function (data) {
            $scope.categories = data;
        });
    }

    init_();
});