/**
 * 处理服务器端请求
 * Created by zhangyong on 14-1-23.
 */

var json_processor = require("./json_processor");
var parameter_processor = require("./parameter_processor");
var query_processor = require("./query_processor")

function handle_request(req, res) {

    var postData = '';
    req.setEncoding = 'utf8';
    req.addListener('data', function (dataPiece) {
        postData += dataPiece;
    });

    function process_request() {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        try {
            var jsonObj = JSON.parse(postData);
        } catch (er) {
            console.log("Parsing Json error:" + er);
            consoled.log(postData);
            res.end(json_processor.error("parsing json error "));
            return;
        }

        var adp_array = jsonObj.adpId;
//        解析postData
        var adp_type = parameter_processor.validate_parameter(adp_array);
        if (adp_type === "err") {
            res.end(json_processor.error("adp type error:" + adp_array.join(",")));
            return;
        }

//      请求数据库查询
        var area_array = jsonObj.city;
        var ret_json = {};
        query_processor.query_proportion(adp_type, adp_array, area_array, function (err, result) {
            ret_json = result;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(json_processor.success(ret_json));     //.stringify(ret_json, null, 4)
        });
    };

    req.addListener('end', process_request);
}

exports.handle_request = handle_request;