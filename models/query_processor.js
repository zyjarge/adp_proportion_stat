/**
 * 处理数据查询逻辑
 * Created by zhangyong on 14-1-23.
 */

var mysql = require("mysql");
var config = require("../config.json");
var async = require("async")

function query_proportion(query_type, adp_id, area_arr, cb) {
    var connection = mysql.createConnection(config.db_info);
    connection.connect(function (err) {
        if (err) {
            console.log("Error:" + err);
            throw err;
        }
        console.log("DB Connect Success!!!");
        connectOnReady();
    });

    var ret_obj = {};

    function connectOnReady() {
        var proportion_type = query_type === "pla" ? "pla_proportion" : "brw_proportion";
        var sql_query = "select day_type,area_id,sum(" + proportion_type + ") as prop from stg_ad_inventory_proportion where area_id = ? and adp_id in (?) group by day_type";
        async.mapSeries(area_arr, function (area_id, callback) {
            console.log("Query Area:" + area_id);
            console.log("Query adp_id:" + adp_id);

            connection.query(sql_query, [area_id, adp_id], function (err, rows, fields) {
                    if (err) {
                        console.log("Error: " + err);
                        connection.end();
                        throw err;
                    }

                    for (var i in rows) {
                        var area_id = rows[i].area_id;
                        var prop = rows[i].prop;
                        var day_type_tmp = rows[i].day_type;

                        var area_obj = ret_obj[area_id];
                        if (area_obj === undefined) {
                            area_obj = {};
                            ret_obj[area_id] = area_obj;
                        }
                        area_obj[day_type_tmp] = prop;
                    }
                    callback();
                }
            );
        }, function () {
            cb(null, ret_obj);
        });
    }
}

exports.query_proportion = query_proportion;
