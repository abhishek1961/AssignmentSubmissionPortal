const {check,validationResult}=require('express-validator')
const {isAuthenicated}=require('../controllers/auth')
const {getUser}=require('../controllers/user')
const config=require('../config')
const path=require('path')
module.exports=(router)=>{

    router.get('/user/:userId',isAuthenicated,getUser)

    router.get('/get-file/:filename',(req,res)=>{
    
        res.sendFile(path.join(__dirname, "../"+config.assets+req.params.filename))
       
    })

    return router;
}