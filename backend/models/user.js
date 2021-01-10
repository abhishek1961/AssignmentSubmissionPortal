const mongoose=require('mongoose')
const crypto=require('crypto')
const { v4: uuidV4 } = require('uuid')
const Schema=mongoose.Schema;



const userSchema=new Schema({
    name:{ type:String,require:true,minlength:[3,'length must be in 3 to 20'],maxlength:[20,'length must be in 3 to 20'],trim:true},
    email:{type:String,require:true,trim:true,unique:true},
    encry_password:{type:String,require:true},
    salt:String,
    role:{type:Number,default:0},
    subjects:[{ type: Schema.Types.ObjectId, ref: 'Subject' }]
},{timestamps:true})

// get encrypted password
userSchema.virtual("password")
.set(function(password){
    this._password=password
    this.salt=uuidV4()
    this.encry_password=this.securePassword(password)
})
.get(function(){
    return this._password
})

//password encrypt and varification 
userSchema.methods={
    authenticate:function(plainpassword){
       
        return this.securePassword(plainpassword)===this.encry_password
    },
    securePassword:function(plainpassword){
       if(!plainpassword){return "";}
       try{
           return crypto.createHmac('sha256',this.salt)
           .update(plainpassword)
           .digest('hex')
       }
       catch(err){
           console.log(err)
           return "";
       } 
    }
}

module.exports=mongoose.model('User',userSchema)
