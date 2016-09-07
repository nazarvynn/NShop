var _ = require('underscore');

module.exports = function (app) {

    var categories = [{
        id: 'category-1',
        name: 'Category 1',
        img: 'category-1.png',
        products: [{
            id: 'product-1',
            name: 'product 1',
            img: 'product-1.png'
        }, {
            id: 'product-2',
            name: 'product 2',
            img: 'product-2.png'
        }, {
            id: 'product-3',
            name: 'product 3',
            img: 'product-3.png'
        }]
    }, {
        id: 'category-2',
        name: 'Category 2',
        img: 'category-2.png',
        products: [{
            id: 'product-4',
            name: 'product 4',
            img: 'product-4.png'
        }, {
            id: 'product-5',
            name: 'product 5',
            img: 'product-5.png'
        }]
    }, {
        id: 'category-3',
        name: 'Category 3',
        img: 'category-3.png',
        products: [{
            id: 'product-6',
            name: 'product 6',
            img: 'product-6.png'
        }, {
            id: 'product-7',
            name: 'product 7',
            img: 'product-7.png'
        }]
    }];


    app.get('/api/categories', function (request, response) {
        //TODO: get this from DB and move to
        var categories_ = _.map(categories, function (category) {
            return _.omit(category, 'products');
        });

        response.status(200);
        response.send(JSON.stringify(categories_));
    });

    app.get('/api/categories/:categoryId', function (request, response) {
        var categoryId = request.params.categoryId;

        //TODO: get this from DB and move to
        var category = _.find(categories, function (category) {
            return categoryId === category.id;
        });
        delete category.products;

        response.status(200);
        response.send(JSON.stringify(category || {}));
    });

    app.get('/api/categories/:categoryId/products', function (request, response) {
        var categoryId = request.params.categoryId;
        var category = _.find(categories, function (category) {
            return categoryId === category.id;
        }) || {};
        var data = {
            category: category,
            products: JSON.parse(JSON.stringify(category.products || '')) || []
        };
        delete category.products;

        response.status(200);
        response.send(JSON.stringify(data || {}));
    });
};