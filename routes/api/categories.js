var _ = require('underscore');

module.exports = function (app, mongoose) {

    //Database model
    var Categories = mongoose.model('categories', {
        name : String,
        products: Array
    });


    //Routes
    app.get('/api/categories', function (request, response) {
        Categories.find(function (error, categories) {
            response.status(200);
            if (error) response.send(error);

            var result = _.map(categories, function (category) {
                return _.omit(category.toObject(), 'products');
            });
            response.json(result);
        });
    });


    app.get('/api/categories/:id', function (request, response) {
        Categories.findById(request.params.id, send(response));
    });


    //TODO:
    app.get('/api/categories/:id/products', function (request, response) {
        Categories.findById(request.params.id, send(response, true));
    });


    app.post('/api/categories', function (request, response) {
        var data = {
            name: request.body.name
        };
        Categories.create(data, send(response));
    });


    app.put('/api/categories/:id', function (request, response) {
        var data = {
            name: request.body.name
        };
        Categories.findOneAndUpdate({ _id: request.params.id }, data, { new: true }, send(response));
    });


    app.delete('/api/categories/:id', function (request, response) {
        Categories.remove({_id : request.params.id}, function (error, category) {
            response.status(200);
            error ? response.send(error) : response.json(category);
        });
    });


    function send(response, includeProducts) {
        return function (error, category) {
            response.status(200);
            if (error) response.send(error);

            var uselessFields = ['__v'];
            if (!includeProducts) uselessFields.push('products');

            var result = _.omit(category.toObject(), uselessFields);
            response.json(result);
        }
    }
};