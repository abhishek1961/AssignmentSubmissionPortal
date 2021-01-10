const User=require('../models/user')
const {check,validationResult}=require('express-validator');
var jwt=require('jsonwebtoken')

exports.signup=(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.json({error:errors.array()[0].msg})
    }
    
    const user=new User(req.body)
    if(user.role==0){
        user.subjects=[]
    }

    user.save((err,user)=>{
        if(err){
            return res.json({error:err})
        }
        else{
            res.json({name:user.name,email:user.email,id:user._id});
        }
    })
}

exports.signin=(req,res)=>{
    const errors=validationResult(req);
    const {email,password}=req.body;
    if(!errors.isEmpty()){
        return res.json({error:errors.array()[0].msg})
    }


    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.json({error:"User not found"})
        }

        if(!user.authenticate(password)){
            return res.json({error:"Email and Password do not match"})
        }

        const token=jwt.sign({_id:user._id,role:user.role},process.env.SECRET,{expiresIn: "365d"})
        const {_id,name,email,role}=user;
        return res.json({token,user:{_id,name,email,role}})
    })
}

// check for authetic token
exports.isAuthenicated=(req,res,next)=>{
    const token=req.headers.authorization
        
        if(!token){
            res.json({success:false,mesaage:'No token provided'})
        }
        else{
            jwt.verify(token,process.env.SECRET,(err,decode)=>{
                if(err){
                    return res.json({error:"Token invalid"})
                }
                else{
                    req.decoded = decode;
                    next()
                }
            })
        }
}

//check for instructor
exports.isInstructor=(req,res,next)=>{
    if(req.profile.role!=1){
        return res.json({
            error:"You are not a Instructor, Access denied"
        })
    }
    next();
}

//check for student
exports.isStudent=(req,res,next)=>{
    if(req.profile.role!=0){
        return res.json({
            error:"You are not a Studen, Access denied"
        })
    }
    next();
}