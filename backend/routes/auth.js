
// const {signout,signup,signin,isSignedin}=require('../controllers/auth')
const {check,validationResult}=require('express-validator')
const {signup,signin,isAuthenicated}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')

module.exports=(router)=>{

    // Params
    router.param('userId',getUserById)

    router.post('/signup',[
        check("name","name should be at least 3 char").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 char").isLength({min:3})
    ],signup)

    router.post('/signin',[
        //this array contains express validation rules    
        check("email","email is required").isEmail(),
        check("password","password field is required").isLength({min:3})
    ],signin)

    //temp will remove later
    router.get('/testroute',isAuthenicated,(req,res)=>{
        var de=new Date("2021-01-08T15:57:10.428Z");
        var de2=new Date("2021-01-08T15:58:10.428Z");
        // var d = new Date();
        de=de.toLocaleString('en-GB', { timeZone: 'Asia/Calcutta' });
        de2=de2.toLocaleString('en-GB', { timeZone: 'Asia/Calcutta' });
        if(de>de2){
            res.send(de)
        }
        else{
            res.send(de2)
        }
        res.send(new Date())
    })

    return router;
}