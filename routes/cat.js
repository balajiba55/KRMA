var express=require('express')
var router= express()

var  catcontroller=require('../controllers/catController')
var utils = require('../utils/authentication');

cc=new  catcontroller()



router.post('/createcat',utils.tokenauthentication,cc.createcat)         //create cat
router.post('/getallcat',utils.tokenauthentication,cc.getallcat)         //get all cat








module.exports= router