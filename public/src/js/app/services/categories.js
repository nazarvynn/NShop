NShop.factory('CategoriesService', function ($http) {
    var service = {};
    var URL = {
        categories: '/api/categories',
        category: '/api/categories/{id}'
    };

    service.getCategories = function () {
        return request('get', URL.categories);
    };

    service.getCategory = function (id) {
        return request('get', URL.category.format({ id: id }));
    };

    service.createCategory = function (category) {
        return request('post', URL.categories, category);
    };

    service.updateCategory = function (category) {
        var id  = category._id;
        return request('put', URL.category.format({ id: id }), category);
    };

    service.removeCategory = function (id) {
        return request('delete', URL.category.format({ id: id }));
    };

    function request(type, url, data) {
        return $http[type](url, data).then(function (response) {
            return response.data;
        }, onError_);
    }

    function onError_(response) {
        console.log('Error:', response);
    }

    return service;
});