NShop.factory('ProductsService', function ($http) {
    var service = {};
    var URL = {
        products: '/api/products',
        product: '/api/products/{id}',
        productsByCategory: '/api/categories/{categoryId}/products',
        productByCategory: '/api/categories/{categoryId}/products/{productId}'
    };

    service.getProducts = function () {
        return request('get', URL.products);
    };

    service.getProduct = function (id) {
        return request('get', URL.product.format({id: id}));
    };

    service.createProduct = function (product) {
        return request('post', URL.products, product);
    };

    //TODO: add "PATCH" method
    service.updateProduct = function (product) {
        var id  = product._id;
        return request('put', URL.product.format({id: id}), product);
    };

    service.removeProduct = function(id) {
        return request('delete', URL.product.format({id: id}));
    };

    service.getProductsByCategory = function (categoryId) {
        var url_ = URL.productsByCategory.format({ categoryId: categoryId });

        return $http.get(url_).then(function (response) {
            return response.data;
        }, onError_);
    };

    function onError_(response) {
        console.log('Error:', response);
    }

    function request(type, url, data) {
        return $http[type](url, data).then(function (response) {
            return response.data;
        }, onError_);
    }

    return service;
});