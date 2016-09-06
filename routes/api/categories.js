module.exports = function (app) {

    var categories = [{
        id: 'category-1',
        name: 'Category 1',
        img: 'category-1.png'
    }, {
        id: 'category-2',
        name: 'Category 2',
        img: 'category-2.png'
    }, {
        id: 'category-3',
        name: 'Category 3',
        img: 'category-3.png'
    }];


    app.get('/api/categories', function (request, response) {
        //TODO: get this from DB and move to
        response.status(200);
        response.send(JSON.stringify(categories));
    });

    app.get('/api/categories/:categoryId', function (request, response) {
        var categoryId = request.params.categoryId;

        //TODO: get this from DB and move to
        var category = {};
        for (var i = 0, length = categories.length; i < length; i++) {
            if (categoryId === categories[i].id) {
                category = categories[i]
            }
        }

        response.status(200);
        response.send(JSON.stringify(category));
    });
};