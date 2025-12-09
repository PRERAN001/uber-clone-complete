const usermodel=require("../models/user")
const captionmodel=require('../models/caption.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const blacklistedtokenmodel=require('../models/blacklistedtoken')
const getTokenFromRequest = (req) => {
    if (req.cookies?.token) return req.cookies.token;
    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
    return null;
};

const authmiddleware=async(req,res,next)=>{
        const token = getTokenFromRequest(req);
    console.log("token",token)
    const isauth=await blacklistedtokenmodel.findOne({'token':token})
    if(isauth){
        return res.status(401).json({error:"unauthorized istoken"})
    }

    if(!token){
        return res.status(401).json({error:"unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.jwtsecret)
        const user=await usermodel.findById(decoded._id)
        req.user=user
        return next()
    }catch(err){
        return res.status(401).json({error:"unauthorized"})
    }
}
module.exports=authmiddleware
module.exports.captonmiddleware=async(req,res,next)=>{
        const token = getTokenFromRequest(req);
    console.log("token",token)
    const isauth=await blacklistedtokenmodel.findOne({'token':token})
    if(isauth){
        return res.status(401).json({error:"unauthorized istoken"})
    }

    if(!token){
        return res.status(401).json({error:"unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.jwtsecret)
        const caption=await captionmodel.findById(decoded._id)
        req.caption=caption
        return next()
    }catch(err){
        return res.status(401).json({error:"unauthorized"})
    }
}