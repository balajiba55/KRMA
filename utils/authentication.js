const config = require('../config/config.json');
const jwt = require('jsonwebtoken');


exports.tokenauthentication = (req,res,next) => {
    var token = req.headers.token||req.body.token||req.query.token;
    jwt.verify(token, config.secret, (err, responce) => {
        if (err) {    
        
            res.status(400).json({ "status":400,err_field: "Not a valid token"});
        } else {
            next()
        }
    })
  
}

