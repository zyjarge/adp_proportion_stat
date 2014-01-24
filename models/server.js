/**
 * Created by zhangyong on 14-1-23.
 */
var http = require('http');
var request_handler = require('./request_handler');

function start() {

    server = http.createServer(request_handler.handle_request);
    server.listen(8000);
    console.log("started at 8000.");
}

start();