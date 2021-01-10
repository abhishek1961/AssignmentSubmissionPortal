const {check,validationResult}=require('express-validator')
const {isAuthenicated,isInstructor,isStudent}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
const {createSubmission,getSubmissionI,getSubmissionS,updateGrade}=require('../controllers/submission')

module.exports=(router)=>{

    router.param('userId',getUserById)

    router.post('/submission/create/:userId',isAuthenicated,isStudent,createSubmission)//tested

    router.get('/submission-student/:userId',isAuthenicated,isStudent,getSubmissionS)

    router.get('/submissions-instructor/get/:userId',isAuthenicated,isInstructor,getSubmissionI)//intesting

    router.post('/update-grade/:userId',isAuthenicated,isInstructor,updateGrade)
    return router
}