const express=require('express')
const router=express.Router()
const {registercaption}=require('../controller/caption.controller.js')
const {logincaption}=require('../controller/caption.controller.js')
const {body}=require('express-validator')
const {getprofile}=require('../controller/caption.controller.js')
const {logout}=require('../controller/caption.controller.js')
const {captonmiddleware}=require('../middleware/auth.moddleware.js')

router.post('/captionregister',[
    body('firstname').isLength({min:3}).withMessage('first name must be at least 3 characters'),
    body('lastname').isLength({min:3}).withMessage('last name must be at least 3 characters'),
    body('email').isEmail().withMessage('invalid email address'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters'),
    body('vechicle.color').isLength({min:3}).withMessage('color name must be at least 3 characters'),
    body('vechicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters'),
    body('vechicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vechicle.vechicletype').isIn(['bike','car','van','truck','bus']).withMessage('invalid vechicle type')


],registercaption)
router.post('/captionlogin',[
    body('email').isEmail().withMessage('invalid email address'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters')
],logincaption)
router.get('/profile',captonmiddleware,getprofile)
router.get('/logout',captonmiddleware,logout)
module.exports=router