/**
 * Created by zhangyong on 14-1-23.
 */
var http = require('http');
var config = require('../conf/config.json');
var request_handler = require('./request_handler');
var logger = require('./logger').getLogger;

function start() {
    server = http.createServer(request_handler.handle_request);
    var server_port = config.server_port;
    server.listen(server_port);
    logger.info("Started at port:" + server_port);
}

start();