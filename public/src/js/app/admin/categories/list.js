NShop.controller('AdminCategoriesList', function ($scope, CategoriesService) {

    $scope.remove = function (categoryId) {
        console.log('delete 1', categoryId);
        //var txt;
        //var r = confirm("Press a button!");
        //if (r == true) {
        //    txt = "You pressed OK!";
        //} else {
        //    txt = "You pressed Cancel!";
        //}
    };

    function init_() {
        $scope.activeItem = 'categories';

        CategoriesService.getCategories().then(function (data) {
            $scope.categories = data;
        });
    }

    init_();
});