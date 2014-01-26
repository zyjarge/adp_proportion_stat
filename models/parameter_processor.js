/**
 * 处理请求参数：
 *      1）判断请求的广告位数据是否合法，全部为已知的广告位。
 *      2）并判断请求的广告位类型：
 *           一次请求中只能包含一类广告位，或者为PC贴片或者为移动端，两者不能并存。
 *           如果全部为某一类的广告位，则按照规则查询地域占比数据：
 *              * PC贴片类查询播放占比,返回“pla”
 *              * 移动端类查询请求占比,返回“brw”
 *              * 如果发现两者混合或者含有其他类型的广告位，返回“err”。
 *
 * Created by zhangyong on 14-1-23.
 */

var config = require("../conf/config");

var pc_adp = config.pc_adp;
var mobile_adp = config.mobile_adp;

//adpIdArr 为广告位Id数组
function validate_parameter(adpIdArr) {
    var cur_type = "";
    for (var i = 0; i < adpIdArr.length; i++) {
        var each_adp = adpIdArr[i];
//        判断是否为pc贴片广告位
        if (pc_adp.indexOf(each_adp) != -1) {
            if (cur_type != "pla" && cur_type != "") {
                cur_type = "err";
                break;
            }
            cur_type = "pla";
        }
//        判断是否是移动广告位
        else if (mobile_adp.indexOf(each_adp) != -1) {
            if (cur_type != "brw" && cur_type != "") {
                cur_type = "err";
                break;
            }
            cur_type = "brw";
        }else{
            cur_type = "err";
            break;
        }
    }
    return cur_type;
}

exports.validate_parameter = validate_parameter;