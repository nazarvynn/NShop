NShop.factory('CategoryProductsService', function ($http) {
    var service = {};
    var URL = {
        categoryProducts: '/api/categories/{categoryId}/products',
        categoryProduct: '/api/categories/{categoryId}/products/{productId}'
    };

    service.getCategoryProducts = function (categoryId) {
        var url = URL.categoryProducts.format({ categoryId: categoryId });
        return request('get', url);
    };

    service.getCategoryProduct = function (categoryId, productId) {
        var url = URL.categoryProduct.format({ categoryId: categoryId, productId: productId });
        return request('get', url);
    };

    service.createCategoryProduct = function (categoryId, product) {
        var url = URL.categoryProducts.format({ categoryId: categoryId });
        return request('post', url, product);
    };

    service.updateCategoryProduct = function (categoryId, product, isEntireUpdate) {
        var method = isEntireUpdate ? 'put' : 'patch';
        var url = URL.categoryProduct.format({ categoryId: categoryId, productId: product._id });
        return request(method, url, product);
    };

    service.removeCategoryProduct = function (categoryId, productId) {
        var url = URL.categoryProduct.format({ categoryId: categoryId, productId: productId });
        return request('delete', url);
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