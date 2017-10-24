// ENV:
const env = require('node-env-file');
env('.env');

// Events:
require('./events/teamcity');

// Server:
const { start } = require('./server');
start();
