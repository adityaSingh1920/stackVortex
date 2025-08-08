const express = require('express')
const router = express.Router();


const {
    login,
    signup,
    sendOtp,
    verifyOtp,
    changePassword ,
   
} = require('../controllers/Auth')


const {
    resetPasswordToken,
    resetPassword
} = require('../controllers/resetPassword')


const {auth} = require('../middleware/auth')

const {sendMessaage} = require('../controllers/Contact')

router.post('/login',login);


router.post('/signup',signup)  

router.post('/sendOtp',sendOtp)
router.post('/verifyOtp',verifyOtp)


router.post('/changePassword',changePassword)


router.post('/resetPasswordToken',resetPasswordToken)

router.post('/reset-password',resetPassword)

router.post('/contact-us',sendMessaage)

module.exports = router;