NShop.factory('CategoriesService', function ($http) {
    var service = {};
    var URL = '/api/categories';

    service.getCategories = function () {
        return $http.get(URL).then(function (response) {
            return response.data;
        }, onError_);
    };

    service.getCategory = function (id) {
        return $http.get(URL + '/' + id).then(function (response) {
            return response.data;
        }, onError_);
    };

    service.createCategory = function (category) {
        return {};
    };

    service.updateCategory = function (category) {
        return {};
    };

    service.deleteCategory = function(id) {
        return {};
    };

    function onError_(response) {
        console.log('Error:', response);
    }

    return service;
});