NShop.controller('AdminCategoryProductsDetail', function ($scope, $stateParams) {

    console.log('AdminCategoryProductsDetail');

    //var originalData = {};
    //var emptyCategory = {
    //    name: ''
    //};
    //
    //$scope.onSubmit = function () {
    //    var categoryId = $scope.category._id;
    //    (categoryId && 'create' !== categoryId) ? updateCategory() : createCategory();
    //};
    //
    //$scope.onReset = function () {
    //    $scope.category = ObjUtils.clone(originalData);
    //};
    //
    //$scope.onClear = clearCategory;
    //
    //function init_() {
    //    var categoryId = $stateParams.categoryId;
    //    if ('create' !== categoryId) getCategory(categoryId);
    //}
    //
    //function showCategory(data) {
    //    originalData = ObjUtils.clone(data);
    //    $scope.category = data;
    //}
    //
    //function getCategory(categoryId) {
    //    CategoriesService.getCategory(categoryId).then(showCategory);
    //}
    //
    //function createCategory() {
    //    CategoriesService.createCategory($scope.category).then(function (response) {
    //        if (response._id) {
    //            clearCategory();
    //            $scope.$emit('AdminCategoriesList.load');
    //        }
    //    });
    //}
    //
    //function updateCategory() {
    //    CategoriesService.updateCategory($scope.category).then(function (response) {
    //        if (response._id) {
    //            showCategory(response);
    //            $scope.$emit('AdminCategoriesList.load');
    //        }
    //    });
    //}
    //
    //function clearCategory() {
    //    $scope.category = ObjUtils.clone(emptyCategory);
    //}
    //
    //init_();
});