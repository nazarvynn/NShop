NShop.controller('AdminCategoriesList', function ($scope, CategoriesService) {

    $scope.removeCategory = function (category) {
        var isOk = confirm('Are you really want to remove "' + category.name + '" category?');
        if (isOk) removeCategory(category._id);
    };

    $scope.$on('AdminCategoriesList.load', loadList);

    function init_() {
        $scope.activeItem = 'categories';
        loadList();
    }

    function loadList() {
        CategoriesService.getCategories()
            .then(function (data) {
                $scope.categories = data;
            });
    }

    function removeCategory(categoryId) {
        CategoriesService.removeCategory(categoryId)
            .then(function (data) {
                if (data.success) loadList();
            });
    }

    init_();
});