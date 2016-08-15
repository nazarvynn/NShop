var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(express.static('public'));

// Create application/x-www-form-urlencoded parser
var urlEncoder = bodyParser.urlencoded({ extended: false });

//GET: Homepage
app.get('/', function (request, response) {

    //Does not work...
    console.log('Cookies: ' + ( JSON.stringify(request.cookies) ));

    //response.send('GET: Homepage');
    response.sendFile(__dirname + '/views/' + 'index.html');
});

//POST: Homepage
app.post('/', function (request, response) {
    response.send('POST: Homepage');
});

//GET: Users
app.get('/users', function (request, response) {
    response.send('GET: Users');
});

//DELETE User
app.delete('/users', function(request, response) {
    response.send('DELETE: Users');
});

//GET: "ab*cd" pattern
app.get('/ab*cd', function (request, response) {
    response.send('GET: ab*cd');
});

//GET: Process
app.get('/process', function (request, response) {
    //Prepare JSON response
    var resp = {
        first_name: request.query.first_name,
        last_name: request.query.last_name
    };
    response.end(JSON.stringify(resp));
});

//GET: Process
app.post('/process', urlEncoder, function (request, response) {
    //Prepare JSON response
    var resp = {
        first_name: request.body.first_name,
        last_name: request.body.last_name
    };
    response.end(JSON.stringify(resp));
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    if ('::' === host) {
        host = '0.0.0.0';
    }

    console.log("Server is started at: http://%s:%s", host, port);
});