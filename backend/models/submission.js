const mongoose=require('mongoose')
const Schema=mongoose.Schema

const submissionSchema=new Schema({
    submittedBy:{type:Schema.Types.ObjectId,ref:"User",require:true},
    assignment:{type:Schema.Types.ObjectId,ref:"Assignment",require:true},
    filname:{type:String,require:true},
    grade:{type:Number,default:0,min:0,max:10},
    onTime:{type:Date,require:true}
},{timestamps:true})


module.exports=mongoose.model('Submission',submissionSchema)