const usermodel=require("../models/user.js")
const createuser=async({firstname,lastname,email,password})=>{
    if(!firstname||!lastname||!email||!password){
        throw Error("all fields are equried")
    }
    const user=usermodel.create({
        
            firstname,
            lastname,
        
        email,password
    })
    return user
}
module.exports=createuser