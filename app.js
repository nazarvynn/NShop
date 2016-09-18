var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('morgan');
var http = require('http');
var path = require('path');


/**
 * Create express app
 */
var app = express();


/**
 * Setup port
 */
app.set('port', process.env.PORT || 3000);


/**
 * Config server
 */
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());


/**
 * MongoDB connection
 */
mongoose.connect('mongodb://127.0.0.1/NShop');

//Database schemas & models
var productSchema = Schema({
    name : String,
    price: Number,
    description: String,
    img: String
});

var categorySchema = Schema({
    name : String,
    products: [productSchema]
});

var Product = mongoose.model('products', productSchema);
var Category = mongoose.model('categories', categorySchema);

/**
 * Routing
 */
// API
require('./routes/api/categories')(app, Category);
require('./routes/api/categoryProducts')(app, Category, Product);
require('./routes/api/products')(app, Category);

// UI
app.all('/*', function (request, response) {
    response.status(200);
    response.set({ 'content-type': 'text/html; charset=utf-8' });
    response.sendfile('public/index.html' );
});


/**
 * Error handling
 */
// catch 404 and forward to error handler
app.use(function (request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (error, request, response, next) {
        response.status(error.status || 500);
        response.render('error', {
            message: error.message,
            error: error
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.render('error', {
        message: error.message,
        error: {}
    });
});

// print error in console
app.on('error', function (error){
    console.log('Error: \n' + error.message);
    console.log(error.stack);
});


/**
 * Create server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Application is running on http://localhost:' + app.get('port'));
});

module.exports = app;