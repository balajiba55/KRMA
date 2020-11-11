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


exports.getallcat = function (req, callback) {

    dbMySQL.query("SELECT * from categorys Where type = ?", [1], function (err, rows, fields) {
        console.log("rows>>>>>>>>>>>", rows)
        var object = {}, result = [];
        if (rows && rows.length) {
            rows.map((item, index) => {
                object = {}
                dbMySQL.query('SELECT * from categorys WHERE catId = ? AND type = ?', [item.Id, 2], function (suberr, subrows) {
                    object = item;
                    object.subcategory = subrows;
                    if (subrows && subrows.length) {
                        subrows.map((subitem, subindex) => {

                            dbMySQL.query('SELECT * from categorys WHERE catId = ? AND subcatId = ? AND type = ?', [item.Id, subitem.Id, 3], function (chaptererr, chapterrows) {
                                object.subcategory.chapter = chapterrows;

                            })


                        })
                    } else {
                        result.push(object);
                    }
                    if (result.length === rows.length) {
                        callback(result);
                    }
                });

            })
        }

    });
}
