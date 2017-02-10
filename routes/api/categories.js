var _ = require('underscore');

module.exports = function (app, Category) {

    var ERROR_400 = 'Bed request';
    var ERROR_404 = 'ID not found or invalid';

    var URL = {
        categories: '/api/categories',
        category: '/api/categories/:id'
    };

    //Routes
    app.get(URL.categories, function (request, response) {
        Category.find(function (error, categories) {
            if (error) {
                sendError_500(response, error);
            } else {
                var result = _.map(categories, function (category) {
                    return _.omit(category.toObject(), ['__v', 'products']);
                });
                response.status(200);
                response.json(result);
            }
        });
    });


    app.get(URL.category, function (request, response) {
        Category.findById(request.params.id, send(200, response));
    });


    app.post(URL.categories, function (request, response) {
        var body = request.body;

        if (_.isEmpty(body)) {
            sendError_400(response);
        } else {
            var category = { name: body.name };
            Category.create(category, send(201, response));
        }
    });


    app.put(URL.category, function (request, response) {
        var body = request.body;

        if (_.isEmpty(body)) {
            sendError_400(response);
        } else {
            var category = { name: body.name };
            Category.findOneAndUpdate({ _id: request.params.id }, category, { new: true }, send(200, response));
        }
    });


    app.delete(URL.category, function (request, response) {
        Category.remove({ _id : request.params.id }, function(error, category) {
            if (error) {
                sendError_500(response, error);
            } else {
                response.status(200);
                response.json({ success: true });
            }
        });
    });


    function send(statusCode, response) {
        return function (error, category) {
            var _statusCode = statusCode || 200;

            if (error) {
                sendError_500(response, error);
            } else if (!category) {
                response.status(404);
                response.send({ error: ERROR_404 });
            } else {
                var result = _.omit(category.toObject(), ['__v', 'products']);
                response.status(_statusCode);
                response.json(result);
            }
        }
    }

    function sendError_400(response) {
        response.status(400);
        response.send({ error: ERROR_400 });
    }

    function sendError_500(response, error) {
        response.status(500);
        response.send(error);
    }
};