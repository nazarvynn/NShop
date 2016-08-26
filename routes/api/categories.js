module.exports = function (app) {

    app.get('/api/categories', function (request, response) {

        //TODO: get this from DB and move to
        var resp = [{
            url: 'category-1',
            name: 'Category 1',
            img: 'category-1.png'
        }, {
            url: 'category-2',
            name: 'Category 2',
            img: 'category-2.png'
        }, {
            url: 'category-3',
            name: 'Category 3',
            img: 'category-3.png'
        }];

        response.status(200);
        response.send(JSON.stringify(resp));
    });
};