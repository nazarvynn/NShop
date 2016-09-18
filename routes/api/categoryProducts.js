var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function (app, Category, Product) {

    var URL = {
        categoryProducts: '/api/categories/:categoryId/products',
        categoryProduct: '/api/categories/:categoryId/products/:productId'
    };

    //Routes
    app.get(URL.categoryProducts, function (request, response) {
        Category.findById(request.params.categoryId, function (error, category) {
            sendError(response, error);
            response.json(category);
        });
    });


    app.get(URL.categoryProduct, function (request, response) {
        var productId = request.params.productId;
        Category.findById(request.params.categoryId, function (error, category) {
            sendError(response, error);
            response.json(category.products.id(productId));
        });
    });


    app.post(URL.categoryProducts, function (request, response) {
        var newProduct = Product(request.body);

        Category.findById(request.params.categoryId, function (error, category) {
            sendError(response, error);

            category.products.push(newProduct);
            category.save(function (error, category) {
                if (error) response.send(error);
                response.json(category);
            });
        });
    });


    //TODO: "PATCH"
    app.put(URL.categoryProduct, function (request, response) {
        var newProduct = Product(request.body);
        var productId = request.params.productId;

        Category.findById(request.params.categoryId, function (error, category) {
            sendError(response, error);

            var product = category.products.id(productId);
            _.each(newProduct.toObject(), function (value, key) {
                if ('_id' !== key) product[key] = value;
            });

            category.save(function (error, category) {
                if (error) response.send(error);
                response.json(category.products.id(productId));
            });
        });
    });


    app.delete(URL.categoryProduct, function (request, response) {
        var productId = request.params.productId;

        Category.findById(request.params.categoryId, function (error, category) {
            sendError(response, error);

            category.products.id(request.params.productId).remove();
            category.save(function (error, category) {
                if (error) response.send(error);
                response.json({ ok: 1 });
            });
        });
    });

    function sendError(response, error) {
        response.status(200);
        if (error) response.send(error);
    }
};