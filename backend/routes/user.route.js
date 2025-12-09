const express=require('express')
const router=express.Router()
const {body}=require('express-validator')
const {registeruser}=require('../controller/user.controller.js')
const {loginuser}=require('../controller/user.controller.js')
const {getprofile}=require('../controller/user.controller.js')
const {logout}=require('../controller/user.controller.js')
const authmiddleware=require('../middleware/auth.moddleware.js')
router.post("/userregister",[
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
],registeruser)
router.post("/userlogin",[
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    
],loginuser)
router.get('/profile',authmiddleware,getprofile)
router.get('/logout',authmiddleware,logout)
module.exports=router