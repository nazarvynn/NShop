var express = require('express');
var app = express();

app.get('/', function (request, response) {
    response.send('Hello World');
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    if ('::' === host) {
        host = '0.0.0.0';
    }

    console.log("Server is started at: http://%s:%s", host, port);
});