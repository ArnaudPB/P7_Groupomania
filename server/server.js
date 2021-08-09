const express = require('express');

const server = express();

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/htmml');
    res.status(200).send('<h1>Your server is up and running</h1>');
});

server.listen(8080, function() {
    console.log('server is listenning');
});