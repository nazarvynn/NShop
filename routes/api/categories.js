var _ = require('underscore');

module.exports = function (app, Category) {

    var URL = {
        categories: '/api/categories',
        category: '/api/categories/:id'
    };

    //Routes
    app.get(URL.categories, function (request, response) {
        Category.find(function (error, categories) {
            if (error) {
                response.status(500);
                response.send(error);
            }

            var result = _.map(categories, function (category) {
                return _.omit(category.toObject(), ['__v', 'products']);
            });
            response.status(200);
            response.json(result);
        });
    });


    app.get(URL.category, function (request, response) {
        Category.findById(request.params.id, send(200, response));
    });


    app.post(URL.categories, function (request, response) {
        var body = request.body;

        if (_.isEmpty(body)) {
            response.status(204);
            response.send({ error: 'No Content' });
        } else {
            var category = { name: body.name };
            Category.create(category, send(201, response));
        }
    });


    app.put(URL.category, function (request, response) {
        var body = request.body;

        if (_.isEmpty(body)) {
            response.status(204);
            response.send({ error: 'No Content' });
        } else {
            var category = { name: body.name };
            Category.findOneAndUpdate({ _id: request.params.id }, category, { new: true }, send(200, response));
        }
    });


    app.delete(URL.category, function (request, response) {
        Category.remove({ _id : request.params.id }, send(200, response));
    });


    function send(statusCode, response) {
        return function (error, category) {
            var _statusCode = statusCode || 200;

            if (error) {
                response.status(500);
                response.send(error);
            }

            if (!category) {
                response.status(404);
                response.send({ error: 'ID not found or invalid' });
            }

            var result = _.omit(category.toObject(), ['__v', 'products']);
            response.status(_statusCode);
            response.json(result);
        }
    }
};