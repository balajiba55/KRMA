var express=require('express')
var router= express()

var  usercontroller=require('../controllers/userController')
uc=new  usercontroller()



router.post('/UserCreation',uc.UserCreation)         //user registration
router.get('/gatalluserdata',uc.gatalluserdata)      //all user data
router.get('/userbyemail/:email',uc.userbyemail)     //all user data
router.post('/userlogin',uc.userlogin)               //user login

router.get('/sample',uc.sample)               //user login




module.exports= router