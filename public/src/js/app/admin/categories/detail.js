NShop.controller('AdminCategoriesDetail', function ($scope, $stateParams, CategoriesService) {

    var actions_ = {
        'create': function () {
            console.log('create 1');
        },
        'edit': function (categoryId) {
            console.log('edit 1');
            CategoriesService.getCategory(categoryId).then(function (data) {
                $scope.category = data;
            });
        }
    };

    $scope.remove = function (categoryId) {
        applyAction('remove', categoryId);
    };

    function applyAction(type, categoryId) {
        actions_[type](categoryId);
    }

    function init_() {
        var categoryId = $stateParams.categoryId;
        var action  = 'create' === categoryId ? 'create' : 'edit';
        applyAction(action, categoryId);
    }

    init_();
});