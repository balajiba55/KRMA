var catModel = require('../model/catModel');
const config = require('../config/config.json');

const jwt = require('jsonwebtoken');
const e = require('express');




function catController() {

}

//create all cats(cat,subcat,chapters,classes)
catController.prototype.createcat = async function (req, res) {
    
    if(req.body.type == 1){
        if (!req.body.level && req.body.level !=0) {
            res.status(400).json({ status: 400, "message": "level is required" });
        } else if (!req.body.parentId && req.body.parentId != 0) {
            res.status(400).json({ status: 400, "message": "parentId is required" });
        }else if (!req.body.Name) {
            res.status(400).json({ status: 400, "message": "Name is required" });
        }
        else {
            var data = await catModel.create(req.body)
                
                if (data.insertId) {
                    res.status(200).json({ status: 200, "message": "cat added successfully" , data: data });
                }else{
                    res.status(400).json({ status: 400, "message": "some thing went wrong"  });
    
                }
            
        }
    }else if(req.body.type ==2){
        if (!req.body.Name) {
            res.status(400).json({ status: 400, "message": "Name required" });
        }
        else if(!req.body.catId){
            res.status(400).json({ status: 400, "message": "cat Id is required" });
    
        }
        else {
            var data = await catModel.create(req.body)
                
                if (data.insertId) {
                    res.status(200).json({ status: 200, "message": "subcat added successfully" , data: data });
                }else{
                    res.status(400).json({ status: 400, "message": "some thing went wrong"  });
    
                }
            
        }

    }else if(req.body.type == 3){
        if (!req.body.Name) {
            res.status(400).json({ status: 400, "message": "Name required" });
        }
        else if(!req.body.catId){
            res.status(400).json({ status: 400, "message": "cat Id is required" });
    
        }
        else if(!req.body.subcatId){
            res.status(400).json({ status: 400, "message": "subcatId is required" });
    
        }
        else {
            var data = await catModel.create(req.body)
                
                if (data.insertId) {
                    res.status(200).json({ status: 200, "message": "chapter added successfully" , data: data });
                }else{
                    res.status(400).json({ status: 400, "message": "some thing went wrong"  });
    
                }
            
        }
    }else if(req.body.type == 4){
        if (!req.body.Name) {
            res.status(400).json({ status: 400, "message": "Name is required" });
        }
        else if(!req.body.catId){
            res.status(400).json({ status: 400, "message": "cat Id is required" });
    
        }
        else if(!req.body.subcatId){
            res.status(400).json({ status: 400, "message": "subcatId is required" });
    
        }
        else if(!req.body.chapterId){
            res.status(400).json({ status: 400, "message": "chapterId is required" });
    
        }
        else {
            var data = await catModel.create(req.body)
                
                if (data.insertId) {
                    res.status(200).json({ status: 200, "message": "class added successfully" , data: data });
                }else{
                    res.status(400).json({ status: 400, "message": "some thing went wrong"  });
    
                }
            
        }

    }else{
        res.status(400).json({ status: 400, "message": "type is required" });

    }
    
}



//create all cats(cat,subcat,chapters,classes)
catController.prototype.getcat = async function (req, res) {
    if (!req.body.level && req.body.level !=0) {
        res.status(400).json({ status: 400, "message": "level is required" });
    
    }else{
        catModel.getcat(req, function (data) {
            if (data) {
                res.status(200).json({ status: 200, "message": "Success", 'categories': data });
            } else {
                res.status(200).json({ status: 200, message: "No records Found" });
            }
        });
    }
    
}






module.exports = catController;