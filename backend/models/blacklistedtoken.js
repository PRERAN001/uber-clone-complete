const mongoose=require("mongoose")
const blacklistedtokenschema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },  
    blacklistedAt:{
        type:Date,
        default:Date.now,
        expries:86400
    }
})
const blacklistedtokenmodel=mongoose.model("blacklistedtoken",blacklistedtokenschema)
module.exports=blacklistedtokenmodel