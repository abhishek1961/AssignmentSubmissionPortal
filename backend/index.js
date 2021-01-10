const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const path=require('path');
const bodyParser=require('body-parser')
const cors=require('cors')
const router=express.Router()


// DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true
}).then(()=>{
     console.log('db connected')
 }).catch((err)=>{
     console.log('get some error')
})

// Middelware
app.use(bodyParser.json())
app.use(cors())

//allow req. from all 
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 
}))


const authRoutes=require('./routes/auth')(router)
const userRoutes=require('./routes/user')(router)
const assignmentRoutes=require('./routes/assignment')(router)
const submissionRoutes=require('./routes/submission')(router)

app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',assignmentRoutes)
app.use('/api',submissionRoutes)



app.use(express.static(__dirname+'/public'))

//uncomment when went to production 
// app.get('*',(req,res,next)=>{
//     res.sendFile(path.join(__dirname+'/public/index.html'));
    
// })

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})