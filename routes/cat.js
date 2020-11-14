var express=require('express')
var router= express()

var  catcontroller=require('../controllers/catController')
var utils = require('../utils/authentication');

cc=new  catcontroller()



router.post('/createcat',utils.tokenauthentication,cc.createcat)         //create cat
router.post('/getcat',utils.tokenauthentication,cc.getcat)         //get all cat








module.exports= router