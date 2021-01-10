const User=require('../models/user')
const {check,validationResult}=require('express-validator');

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return  res.json({error:'No user was found in DB'})
        }
        req.profile=user;
        next();
    })
}

exports.getUser=(req,res)=>{
    req.profile.salt=undefined
    req.profile.encry_password=undefined
    return res.json(req.profile)
}