var express=require('express')
var router= express()

var  usercontroller=require('../controllers/userController')
var utils = require('../utils/authentication');
uc=new  usercontroller()



router.post('/UserCreation',uc.UserCreation)         //user registration
router.get('/gatalluserdata',uc.gatalluserdata)      //all user data
router.get('/userbyemail/:email',uc.userbyemail)     //all data by email
router.post('/userlogin',uc.userlogin)   
router.post('/updateuserstatus',uc.updateuserstatus)               //update user active inactive status
            

router.get('/sample',uc.sample)               //user login




module.exports= router;