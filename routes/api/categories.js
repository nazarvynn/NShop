var _ = require('underscore');

module.exports = function (app, Category) {

    var URL = {
        categories: '/api/categories',
        category: '/api/categories/:id'
    };

    //Routes
    app.get(URL.categories, function (request, response) {
        Category.find(function (error, categories) {
            response.status(200);
            if (error) response.send(error);

            var result = _.map(categories, function (category) {
                return _.omit(category.toObject(), ['__v', 'products']);
            });
            response.json(result);
        });
    });


    app.get(URL.category, function (request, response) {
        Category.findById(request.params.id, send(response));
    });


    app.post(URL.categories, function (request, response) {
        var category = {
            name: request.body.name
        };
        Category.create(category, send(response));
    });


    app.put(URL.category, function (request, response) {
        var category = {
            name: request.body.name
        };
        Category.findOneAndUpdate({ _id: request.params.id }, category, { new: true }, send(response));
    });


    app.delete(URL.category, function (request, response) {
        Category.remove({ _id : request.params.id }, function (error, category) {
            response.status(200);
            error ? response.send(error) : response.json(category);
        });
    });


    function send(response) {
        return function (error, category) {
            response.status(200);
            if (error) response.send(error);

            var result = _.omit(category.toObject(), ['__v', 'products']);
            response.json(result);
        }
    }
};