/**
 *
 * 处理Json相关操作
 * Created by zhangyong on 14-1-23.
 */

var result = {
    "status": "",
    "info": "",
    "proportion": ""
};

//生成错误的Json信息
function error(error_info) {
    result.status = "error";
    result.info = error_info;
    result.proportion = "";
    return JSON.stringify(result, null, 4);
}

function success(proportion) {
    result.status = "ok";
    result.info = "query success!";
    result.proportion = proportion;
    return JSON.stringify(result, null, 4);
}
exports.error = error;
exports.success = success;
