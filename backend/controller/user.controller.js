const usermodel = require("../models/user.js");
const createuser = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const blacklistedtokenmodel=require('../models/blacklistedtoken.js')

module.exports.registeruser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;
    const isuserexists=await usermodel.findOne({email})
    if(isuserexists){
        return res.status(400).json({"message":"users exists with this email"})
    }

    
    const tempUser = new usermodel();

    const hashpassword = await tempUser.hashPassword(password);

    const user = await createuser({
        firstname, lastname ,
        email,
        password: hashpassword
    });

    const token = tempUser.generateAuthToken();

    return res.status(201).json({ user, token });
};
module.exports.loginuser=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    const user=await usermodel.findOne({email}).select('+password')
    if(!user){
        return res.status(400).json({error:"invalid email or password"})
    }
    const ismatch=await user.comparePassword(password)
    if(!ismatch){
        return res.status(400).json({error:"invalid email or password"})
    }
    const token=user.generateAuthToken()
    res.cookie('token',token)
    return res.status(200).json({user,token})

}
module.exports.getprofile=async (req,res)=>{
    return res.status(200).json({user:req.user})

}

module.exports.logout = async (req, res) => {
  const token =
    req.cookies?.token ||
    req.headers?.authorization?.split(" ")[1];

  await blacklistedtokenmodel.create({ token });

  res.clearCookie("token");
  return res.status(200).json({ message: "logged out successfully" });
};
