NShop.controller('AdminCategoriesList', function ($scope, CategoriesService) {

    function init_() {
        $scope.activeItem = 'categories';

        CategoriesService.getCategories().then(function (data) {
            $scope.categories = data;
        });
    }

    init_();
});