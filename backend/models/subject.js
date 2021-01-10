const mongoose=require('mongoose')

const subjectSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:[3,'length must be in 3 to 20'],maxlength:[20,'length must be in 3 to 20']}
})

module.exports=mongoose.model('Subject',subjectSchema)