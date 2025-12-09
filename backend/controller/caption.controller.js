const captionmodel = require('../models/caption.model');
const createCaption = require('../services/caption.service');
const { validationResult } = require('express-validator');
const blacklistedtokenmodel=require('../models/blacklistedtoken.js')

module.exports.registercaption = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { firstname, lastname, email, password, vechicle } = req.body;

        let iscaptionexists = await captionmodel.findOne({ email });
        if (iscaptionexists) {
            return res.status(400).json({ error: 'caption already exists' });
        }

        const temp = new captionmodel();
        const hashPassword = await temp.hashpassword(password);

        const caption = await createCaption({
            firstname, lastname, email, password: hashPassword,
            color: vechicle.color,
            plate: vechicle.plate,
            capacity: vechicle.capacity,
            vechicletype: vechicle.vechicletype
        });

        const driverid=caption._id
        const token = caption.generateauthtoken();

        res.status(201).json({ message: 'caption registered successfully', caption, token,driverid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports.logincaption=async(req,res)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {email,password}=req.body
        console.log("emial",email,password)
        
        let iscaptionexists=await captionmodel.findOne({email}).select('+password')
        if(!iscaptionexists){
            return res.status(400).json({error:'caption does not exist'})
        }
        const ispasswordvalid=await iscaptionexists.comparepassword(password)
        if(!ispasswordvalid){
            return res.status(400).json({error:'invalid password'})
        }
        const driverid=iscaptionexists._id
        const token=iscaptionexists.generateauthtoken()
        res.cookie('token',token)
        res.status(200).json({
            message:'caption logged in successfully',
            token,
            driverid,
            firstname: iscaptionexists.firstname,
            lastname: iscaptionexists.lastname,
            email: iscaptionexists.email,
            vechicle: iscaptionexists.vechicle
        }) 
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports.getprofile = async (req, res) => {
    try {
        const caption = req.caption;
        if (!caption) {
            return res.status(401).json({ error: 'caption not found' });
        }
        res.status(200).json({ caption });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.logout = async (req, res) => {
    try {
        const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
        console.log("caption logout token:", token);

        if (token) {
            await blacklistedtokenmodel.create({ token });
        }

        res.clearCookie("token");
        return res.status(200).json({ message: "logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};