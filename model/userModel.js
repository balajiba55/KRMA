'use strict';
var dbMySQL = require('../utils/dbConnection');
//     jwt = require('jsonwebtoken'),
//     config = require('../config/config.json'),
const bcrypt = require('bcryptjs');
const saltval = 10;









//get user data
exports.userdata = async function (data) {
    try {
        return await new Promise((resolve, reject) => {

            dbMySQL.query('SELECT * FROM krms_users where email = ? OR mobileNo = ?', [data.email, data.mobileNo], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });


        });

    } catch (err) {
    }
};

//create user
exports.createuser = async function (data) {
    try {
        return await new Promise((resolve, reject) => {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(data.password, salt);
            
            let Obj = {};
            Obj = data;
            Obj.password = hash;
            dbMySQL.query('INSERT INTO krms_users SET ?', Obj, (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });

        });

    } catch (err) {
    }
};


//create user
exports.gatalluserdata = async function (data) {
    try {
        return await new Promise((resolve, reject) => {
            dbMySQL.query('SELECT * FROM krms_users', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
    }
};

//user by email
exports.userbyemail = async function (data) {
    try {
        return await new Promise((resolve, reject) => {
            dbMySQL.query('SELECT * FROM krms_users where email = ?', [data.params.email], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
    }
};


//user login
exports.userlogin = async function (data) {
    try {
        return await new Promise((resolve, reject) => {
            dbMySQL.query('SELECT * FROM krms_users where email = ? OR mobileNo = ?', [data.email,data.mobileNo], (error, results, fields) => {
                
                if (error) return reject(error)
                if (results && results.length) {
                   var passwordstatus =  bcrypt.compareSync(data.password,results[0].password);
                   var obj = {passwordstatus : passwordstatus ,results : results}
                  
                   return resolve(obj);

                } else {
                    return resolve({});

                }

            });
        });

    } catch (err) {
    }
};



