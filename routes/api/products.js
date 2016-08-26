module.exports = function (app) {

    app.get('/api/products', function (request, response) {

        //TODO: get this from DB and move to
        var resp = [{
            url: 'product-1',
            name: 'product 1',
            img: 'product-1.png'
        }, {
            url: 'product-2',
            name: 'product 2',
            img: 'product-2.png'
        }, {
            url: 'product-3',
            name: 'product 3',
            img: 'product-3.png'
        }];

        response.status(200);
        response.send(JSON.stringify(resp));
    });
};