var userModel = require('../model/userModel');
const config = require('../config/config.json');

const jwt = require('jsonwebtoken');




function userController(){

}

//user create
userController.prototype.UserCreation = async function (req, res) {
    if (!req.body.email) {
        res.status(400).json({ status: 400, "message": "Email is required" });
    } else if (!req.body.password) {
        res.status(400).json({ status: 400, "message": "Password is required" });
    } else if (!req.body.firstName || !req.body.lastName || !req.body.userNamePrefix || !req.body.middleName || !req.body.physicalAdderess || !req.body.county || !req.body.nationality || !req.body.profession || !req.body.userName || !req.body.mobileNo || !req.body.countryCode) {
        res.status(400).json({ status: 400, "message": "Please enter all required fields" });

    } else {
        let userdata = await userModel.userdata(req.body)
        if (userdata && userdata.length) {
            res.status(400).json({ status: 400, "message": "dulicate email or mobileNumber" });

        } else {
            let createuser = await userModel.createuser(req.body);
            if (createuser.insertId) {
                var token = jwt.sign({email: req.body.email,userId : createuser.insertId}, config.secret);

                res.status(201).json({ status: 201, "message": "Registration completed successfully",token : token });

            } else {
                res.status(500).json({ status: 500, "message": "something went wrong" });

            }
        }
    }
}


//gat all user data
userController.prototype.gatalluserdata = async function (req, res) {
    let userdata = await userModel.gatalluserdata(req.body);
    if (userdata && userdata.length) {
        res.status(200).json({ status: 200, "message": "success", userdata: userdata });

    } else {
        res.status(200).json({ status: 200, "message": "No users found", userdata: [] });

    }

}


//gat user by email
userController.prototype.userbyemail = async function (req, res) {
    let userdata = await userModel.userbyemail(req);
    if (userdata && userdata.length) {
        res.status(200).json({ status: 200, "message": "success", userdata: userdata });

    } else {
        res.status(400).json({ status: 400, "message": "No users found", userdata: [] });

    }
}


//user login
userController.prototype.userlogin = async function (req, res) {
    if (!req.body.email && !req.body.mobileNo) {
        res.status(400).json({ status: 400, "message": "Email Or Mobile is required" });
    } else if (!req.body.password) {
        res.status(400).json({ status: 400, "message": "Password is required" });

    } else {
        let userlogin = await userModel.userlogin(req.body);              
        if (userlogin.passwordstatus == true) {
            var token = jwt.sign({email: req.body.email,userId : userlogin.results[0].userId}, config.secret);
            res.status(200).json({ status: 200, "message": "user login success",token : token});

        } else {
            res.status(400).json({ status: 400, "message": "invalid credentials"});

        }

    }
}



//user login
userController.prototype.sample = async function (req, res) {
    var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhbGFqaWJhYnUxMjFAZ21haWwuY29tIiwidXNlcklkIjoyMiwiaWF0IjoxNTk4NzU4OTgwfQ.h9io6u6AixmDyjhRrChbHE3a5zEz8HcemhTWKP9PW9s", config.secret);
    console.log(decoded) // bar
}


module.exports = userController;