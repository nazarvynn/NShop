var _ = require('underscore');

module.exports = function (app, Category) {

    var URL = {
        products: '/api/products',
        product: '/api/product/:id'
    };

    app.get(URL.products, function (request, response) {
        Category.find(function (error, categories) {
            if (error) {
                response.status(500);
                response.send(error);
            } else if (!categories) {
                response.status(404);
                response.send({ error: 'Not found' });
            } else {
                var result = _.chain(categories)
                    .map(function (category) {
                        var categoryObj = category.toObject();
                        if (!categoryObj.products.length) return [];

                        return categoryObj.products = _.map(categoryObj.products, function (product) {
                            return {
                                categoryId: category._id,
                                data: product
                            };
                        })
                    })
                    .flatten()
                    .value();

                response.status(200);
                response.json(result);
            }
        });
    });
};