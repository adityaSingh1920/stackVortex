const express = require('express')
const router = express.Router();



const {auth} = require('../middleware/auth')

const 
{
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    profilePicUpdate,
    getEnrolledCourses
    

}  = require('../controllers/Profile')


router.delete('/deleteProfile',auth,deleteAccount)
router.put('/updateProfile',auth,updateProfile)
router.get('/getAllUserDetails',auth,getAllUserDetails)
router.put('/profilePicUpdate',auth,profilePicUpdate)
router.get('/getEnrolledCourses',auth,getEnrolledCourses)


module.exports = router;