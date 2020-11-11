var express=require('express')
var router= express()

var  catcontroller=require('../controllers/catController')
cc=new  catcontroller()



router.post('/createcat',cc.createcat)         //create cat
router.post('/getallcat',cc.getallcat)         //get all cat








module.exports= router