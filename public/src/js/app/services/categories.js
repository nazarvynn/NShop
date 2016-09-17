NShop.factory('CategoriesService', function ($http) {
    var service = {};
    var URL = '/api/categories';

    service.getCategories = function () {
        return request('get', URL);
    };

    service.getCategory = function (id) {
        return request('get', URL + '/' + id);
    };

    service.createCategory = function (category) {
        return request('post', URL, category);
    };

    service.updateCategory = function (category) {
        var id  = category._id;
        return request('put', URL + '/' + id, category);
    };

    service.removeCategory = function (id) {
        return request('delete', URL + '/' + id);
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