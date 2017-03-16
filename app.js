const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const Pack = require('./package');
const configureRoutes = require('./src/routes');

const hostname = 'localhost';
const port = 3000;
const db = require('./config/db');

const server = new Hapi.Server();
server.connection({
    host: hostname,
    port: port
});

const options = {
    info: {
        'title': 'Movie API Documentation',
        'version': Pack.version,
    }
};

server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
    }], (err) => {
        if(err){
            server.error(`Something went wrong, can't start server.`);
        } else {
            const routes = configureRoutes();
            server.route(routes);
            server.start((err) => {
                if (err) {
                    throw err;
                } else {
                    console.log(`Server running at ${hostname}:${port}`);
                }
            });
        }
    });