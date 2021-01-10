const {check,validationResult}=require('express-validator')
const {isAuthenicated,isInstructor,isStudent}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
const {createSubject,createAssignment,getAllSubjects,getInstructorAssign,
    getUpcomingAssign,getInstructorSubs} =require('../controllers/assignment')
module.exports=(router)=>{

    router.param('userId',getUserById)

    router.post('/subject/create/',[
        check("name","name should be at least 3 char").isLength({min:3}),
    ],createSubject)

    router.get('/getAllSubjects',getAllSubjects)//tested

    router.get('/getSubjects/:userId',isAuthenicated,isInstructor,getInstructorSubs)//tested

    router.post('/assignment/create/:userId',isAuthenicated,isInstructor,createAssignment)//tested

    router.get('/assignment-instructor/get/:userId',isAuthenicated,isInstructor,getInstructorAssign)//tested

    router.get('/assignment/get-upcoming/:userId',isAuthenicated,isStudent,getUpcomingAssign)

    return router;
}