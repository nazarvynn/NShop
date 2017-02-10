var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function (app, Category, Product) {

    var ERROR_400 = 'Bed request';
    var ERROR_404 = 'ID not found or invalid';

    var URL = {
        categoryProducts: '/api/categories/:categoryId/products',
        categoryProduct: '/api/categories/:categoryId/products/:productId'
    };

    //Routes
    app.get(URL.categoryProducts, function (request, response) {
        Category.findById(request.params.categoryId, function (error, category) {
            if (error) {
                sendError_500(response, error);
            } else {
                response.status(200);
                response.json(category);
            }
        });
    });


    app.get(URL.categoryProduct, function (request, response) {
        var productId = request.params.productId;
        Category.findById(request.params.categoryId, function (error, category) {
            if (error) {
                sendError_500(response, error);
            } else if (!category) {
                sendError_404(response);
            } else {
                response.status(200);
                response.json(category.products.id(productId));
            }
        });
    });


    app.post(URL.categoryProducts, function (request, response) {
        var body = request.body;
        if (_.isEmpty(body)) {
            sendError_400(response);
        } else {
            var newProduct = Product(body);

            Category.findById(request.params.categoryId, function (error, category) {
                if (error) {
                    sendError_500(response, error);
                } else if (!category) {
                    sendError_404(response);
                } else {
                    category.products.push(newProduct);
                    category.save(function (error, category) {
                        if (error) {
                            sendError_500(response, error);
                        } else {
                            response.status(201);
                            response.json(category);
                        }
                    });
                }
            });
        }
    });


    app.put(URL.categoryProduct, function (request, response) {
        var body = request.body;
        if (_.isEmpty(body)) {
            sendError_400(response);
        } else {
            var newProduct = Product(body);
            var productId = request.params.productId;

            Category.findById(request.params.categoryId, function (error, category) {
                if (error) {
                    sendError_500(response, error);
                } else if (!category) {
                    sendError_404(response);
                } else {
                    var product = category.products.id(productId);
                    _.each(newProduct.toObject(), function (value, key) {
                        if ('_id' !== key) product[key] = value;
                    });

                    category.save(function (error, category) {
                        if (error) {
                            sendError_500(response, error);
                        } else {
                            response.status(200);
                            response.json(category.products.id(productId));
                        }
                    });
                }
            });
        }
    });


    app.patch(URL.categoryProduct, function (request, response) {
        var body = request.body;
        if (_.isEmpty(body)) {
            sendError_400(response);
        } else {
            var newProduct = Product(body);
            var productId = request.params.productId;

            Category.findById(request.params.categoryId, function (error, category) {
                if (error) {
                    sendError_500(response, error);
                } else if (!category) {
                    sendError_404(response);
                } else {
                    var product = category.products.id(productId);
                    _.each(newProduct.toObject(), function (value, key) {
                        if ('_id' !== key) product[key] = value;
                    });

                    category.save(function (error, category) {
                        if (error) {
                            sendError_500(response, error);
                        } else {
                            response.status(200);
                            response.json(category.products.id(productId));
                        }
                    });
                }
            });
        }
    });


    app.delete(URL.categoryProduct, function (request, response) {
        var productId = request.params.productId;

        Category.findById(request.params.categoryId, function (error, category) {
            if (error) {
                sendError_500(response, error);
            } else if (!category) {
                sendError_404(response);
            } else {
                category.products.id(request.params.productId).remove();
                category.save(function (error, category) {
                    if (error) {
                        sendError_500(response, error);
                    } else {
                        response.status(200);
                        response.json({ success: true });
                    }
                });
            }
        });
    });

    function sendError_400(response) {
        response.status(204);
        response.send({ error: ERROR_400 });
    }

    function sendError_404(response) {
        response.status(404);
        response.send({ error: ERROR_404 });
    }

    function sendError_500(response, error) {
        response.status(500);
        response.send(error);
    }
};