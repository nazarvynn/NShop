module.exports = function (app) {

    var products = [{
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
    }, {
        id: 'product-4',
        name: 'product 4',
        img: 'product-4.png'
    }, {
        id: 'product-5',
        name: 'product 5',
        img: 'product-5.png'
    }, {
        id: 'product-6',
        name: 'product 6',
        img: 'product-6.png'
    }, {
        id: 'product-7',
        name: 'product 7',
        img: 'product-7.png'
    }];

    app.get('/api/products', function (request, response) {
        //TODO: get this from DB and move to
        response.status(200);
        response.send(JSON.stringify(products));
    });

    app.get('/api/products/:productId', function (request, response) {
        var productId = request.params.productId;

        //TODO: get this from DB and move to
        var product = {};
        for (var i = 0, length = products.length; i < length; i++) {
            if (productId === products[i].id) {
                product = products[i];
            }
        }

        response.status(200);
        response.send(JSON.stringify(product));
    });
};