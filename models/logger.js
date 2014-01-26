/**
 * log4js封装类
 * Created by zhangyong on 14-1-26.
 */

var log4js = require('log4js');
var jog4js_conf = require('../conf/log4js.json');

log4js.configure(jog4js_conf);

function getLogger() {
    var logger = log4js.getLogger("default");
    return logger;
}

exports.getLogger = getLogger();