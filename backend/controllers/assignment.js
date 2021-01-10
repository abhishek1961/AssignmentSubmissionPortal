const Subject=require('../models/subject')
const Assignment=require('../models/assignment')
const Submission=require('../models/submission')
const User=require('../models/user')
const {check,validationResult}=require('express-validator');
const config = require('../config')

const formidable =require('formidable')
const fs = require("fs") 
const moment = require('moment');
const assignment = require('../models/assignment');

exports.createSubject=((req,res)=>{
   

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.json({error:'Plese check the field'})
    }

    const subject =new Subject(req.body)

    subject.save((err,subject)=>{
        if(err){
            return res.json({error:err})
        }
        else{
            res.json({name:subject.name});
        }
    })
})

exports.getAllSubjects=((req,res)=>{
    Subject.find({},{__v:0},(err,subjects)=>{
        if(err){
            return res.json({error:err})
        }
        res.json({subjects:subjects})
    })
})

exports.createAssignment=((req,res)=>{
   

    let form=new formidable.IncomingForm()
    form.keepExtensions=true

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.json({error:"Can not upload file at this time"})
        }
        
        const {name,subject,deadline}=fields
        
        if( !name || !subject || !deadline){
            return res.json({error:"please include all fields"})
        }

        if(!file.pdfFile){
            return res.json({error:"File not found"})
        }

        if(file.pdfFile.size> config.maxFileSize || file.pdfFile.type !=config.fileType){
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
                            fields.createdBy=req.decoded._id;
                            // fields.deadline=moment()
                            let assignment=new Assignment(fields)

                            assignment.save((err,assignment)=>{
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
        
        

    })
})

exports.getInstructorAssign=(req,res)=>{
    Assignment.find({createdBy:req.decoded._id})
        .populate('subject')
        .exec((err,assignments)=>{
        if(err){
            return res.json({error:err})
        }
        res.json({assignments:assignments})
    })
}

// get subjects of instructor
exports.getInstructorSubs=(req,res)=>{
    User.findOne({ _id:req.decoded._id},{subjects:1})
.populate('subjects') 
.exec(function(err,user ) {
    if (err) {
        return res.json({error:err})
    }
    res.json({subjects:user.subjects})
});
}

//get assignment for students
exports.getUpcomingAssign=(req,res)=>{
    Assignment.find({deadline:{$gt:Date.now()}})
    .populate('subject')
    .sort({deadline:1})
    .exec((err,assignments)=>{
        if(err){
            return res.json({error:err})
        }
        
        else{
           
            var assign=[];
            assignments.forEach((curr,index)=>{
                Submission.find({submittedBy:req.decoded._id,assignment:curr._id},(err,sub)=>{
                    if(err){
                        return res.json({error:err})
                    }
                    
                    else if(sub.length==0){
                       assign.push(curr);                      
                    }
                   
                })
               
                
                
                  
                
            })
           //a bug
           setTimeout(()=>{ return res.json({assignments:assign})},20)
            
        }
        
        
    })
}


