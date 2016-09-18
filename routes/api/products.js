var _ = require('underscore');

module.exports = function (app, Category) {

    var URL = {
        products: '/api/products',
        product: '/api/product/:id'
    };

    app.get(URL.products, function (request, response) {
        Category.find(function (error, categories) {
            response.status(200);
            if (error) response.send(error);

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

            response.json(result);
        });
    });
};