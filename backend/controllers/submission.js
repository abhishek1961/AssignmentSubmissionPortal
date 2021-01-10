const Submission=require('../models/submission')
const Assignment=require('../models/assignment')
const User=require('../models/user')
const {check,validationResult}=require('express-validator')
const config = require('../config')

const formidable =require('formidable')
const _ =require('lodash')
const fs = require("fs")


exports.updateGrade=(req,res)=>{
    Submission.updateOne({_id:req.body.id},
        {$set:{grade:req.body.grade}},
        (err,submission)=>{
            if(err){
                    return resjson({error:"Cannot update order status"})
                }
                res.json({message:'Grade Updated'})
            }        
        )
}

exports.createSubmission=((req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.json({error:errors.array()[0].msg})
    }
    

    let form=new formidable.IncomingForm()
    form.keepExtensions=true

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.json({error:"Can not upload file at this time"})
        }
       
        const {assignment}=fields
        
        if( !assignment){
            return res.json({error:"please include all fields"})
        }

        
        //check deadline
        Assignment.find({deadline:{$lt:Date.now()},_id:assignment},(error,result)=>{
            
            if(error){
                return res.json({error:'Can not update File this time'})
            }
            else {
                if(result.length){
                    return res.json({error:'Deadline of submission has passed'})
                }

                //check pre submitted
                Submission.find({submittedBy:req.decoded._id,assignment:assignment},(err,result)=>{

                    if(err){
                        return res.json({error:'Can not submit file at this time'})
                    }
                    else{
                        if(result.length){
                            return res.json({error:'You have alerady submitted Submission'})
                        }
                        //
                        //start
                if(!file.pdfFile){
                    return res.json({error:"File not found"})
                }
                
                if(file.pdfFile.size> config.maxFileSize || file.pdfFile.type !==config.fileType){
                    return res.json({error:"File must be PDF of size less then 10MB"})
                }
                try{
                    date = Date.now()                    
                    var oldpath = file.pdfFile.path;

                    //fileterfile name
                    file.pdfFile.name = date +'_'+file.pdfFile.name.replace(/[{(\s+)}]/g, '');                    

                    //configure this path in config.js
                    var newpath = config.assets + file.pdfFile.name;

                    fs.rename(oldpath, newpath, function (err) {
                        if (err) {
                            fs.unlink(oldpath, (err) => {
                                if (err) {                                    
                                    return
                                }
                            })
                            throw err
                        }
                        else {

                           
                            fields.filname=file.pdfFile.name;
                            fields.submittedBy=req.decoded._id;
                            fields.onTime=new Date()
                            
                            // fields.deadline=moment()
                            let submission=new Submission(fields)

                            

                            submission.save((err,submission)=>{
                                if(err){
                                    //can add code to remove file
                                    return res.json({error:"Please fill all fields correctly"})
                                }
                                res.json({message:'data saved sucessfully',success:true});
                            })
                        }

                    });
                }
                catch(err){return res.json({error:"Can not upload file at this time"})}
                // end
                    }
                    
                })
               
                
                
            }
            
        })


                
        
        

    })
})

exports.getSubmissionI=(req,res)=>{
    Submission.find({},{assignment:1,filname:1,onTime:1,grade:1})
    .sort({onTime:-1})
    .populate({
        path:'assignment',
        select:'name filname subject ',
        populate:[{
            path:'createdBy',
            match:{_id:req.decoded._id},
            select:'name'
        },
        {
            path:'subject',
            select:'name'
        }],
    })
    .populate({
        path:'submittedBy',
        select:'name'
    })
    .exec(function(err,submissions ) {
        if (err) {
            return res.json({error:err})
        }
        res.json({submissions:submissions})
    });
   
}

exports.getSubmissionS=(req,res)=>{
    Submission.find({submittedBy:req.decoded._id})
    .sort({onTime:-1})
    .populate({
        path:'assignment',
        select:'name filname subject',
        populate:[{
            path:'createdBy',
            select:'name'
        },
        {
            path:'subject',
            select:'name'
        }],
    })
    .populate({
        path:'submittedBy',
        select:'name'
    })
    .exec(function(err,submissions ) {
        if (err) {
            return res.json({error:err})
        }
        res.json({submissions:submissions})
    });
}