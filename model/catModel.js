'use strict';
var dbMySQL = require('../utils/dbConnection');











//create cat
exports.create = async function (data) {
    console.log("comming to model")
    try {
        return await new Promise((resolve, reject) => {

            dbMySQL.query('INSERT INTO categorys SET ?', data, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            });


        });

    } catch (err) {
    }
};


//create chapter
exports.createchapter = async function (data) {

    try {
        return await new Promise((resolve, reject) => {

            dbMySQL.query('INSERT INTO chapters SET ?', data, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            });


        });

    } catch (err) {
    }
};


exports.getcat = function (req, callback) {
    if (req.body.type == 1) {
        dbMySQL.query("SELECT * from categorys Where type = ? AND level = ?", [req.body.type, req.body.level], function (err, rows, fields) {
           console.log("rows>>>>>>>>>>>>>>>>>>>",rows)
            if (rows && rows.length) {

                callback(rows);

            } else {
                callback([]);

            }

        });
    } else {
        dbMySQL.query("SELECT * from categorys Where type = ? AND parentId = ?", [req.body.type, req.body.parentId], function (err, rows, fields) {
            if (rows && rows.length) {

                callback(rows);




            } else {
                callback([]);


            }

        });
    }

}
