const http = require('http');
const app = require('./app');
const debug = require('debug')('e-template:server');
const models = require('./models/index');

const normalizePort = val => {
    // Normalizeport function send a valid port, wether it's a number or a string
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    // the error handler function seek for different types of error and deals with them then it's saved in the server
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

models.sequelize.sync().then(function() {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, function() {
        debug('Express server listening on port ' + server.address().port);
    });
    server.on('error', errorHandler);
    server.on('listening', () => {
        const address = server.address();
        const bind =
            typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
        console.log('Listening on ' + bind);
    });

    require('./config/admin');
});