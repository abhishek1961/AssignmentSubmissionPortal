const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const assignmentSchema=new Schema({
    createdBy:{type:Schema.Types.ObjectId,ref:"User",require:true},
    name:{type:String,require:true,minlength:[3,'length must be in 3 to 20'],maxlength:[20,'length must be in 3 to 20'],trim:true},
    subject:{type:Schema.Types.ObjectId,ref:"Subject"},
    filname:{type:String,require:true},
    deadline:{type:Date,require:true}
},{timestamps:true})

module.exports=mongoose.model('Assignment',assignmentSchema)