NShop.factory('ProductsService', function ($http) {
    var service = {};
    var URL = {
        products: '/api/products',
        productsByCategory: '/api/categories/{categoryId}/products'
    };

    service.getProducts = function () {
        return $http.get(URL.products).then(function (response) {
            return response.data;
        }, onError_);
    };

    service.getProductsByCategory = function (categoryId) {
        var url_ = URL.productsByCategory.format({ categoryId: categoryId });

        return $http.get(url_).then(function (response) {
            return response.data;
        }, onError_);
    };

    service.getProduct = function (id) {
        return $http.get(URL.products + '/' + id).then(function (response) {
            return response.data;
        }, onError_);
    };

    service.createProduct = function (product) {
        return {};
    };

    service.updateProduct = function (product) {
        return {};
    };

    service.deleteProduct = function(id) {
        return {};
    };

    function onError_(response) {
        console.log('Error:', response);
    }

    return service;
});