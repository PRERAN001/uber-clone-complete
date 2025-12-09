const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const captionSchema=new mongoose.Schema({
         firstname: {
            type: String,
            required: true,
            minlength: [3, "first name must be at least 3 characters"]
        },
        lastname: {
            type: String,
            minlength: [3, "last name must be at least 3 characters"]
        },
    
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "email must be at least 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketid: {
        type: String
    },
    status:{
        type:String,
        enum:['online','offline'],
        deault:'offline'
    },
    vechicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color should be 3 character long']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate must  should be 3 character long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must  should be 1 ']
        },
        vechicletype:{
            type:String,
            required:true,
            enum:['bike','car','van','truck','bus'],
        }
    },
    location:{
        lattitute:{
            type:Number
        },
        longitute:{
            type:Number
        }
    }
}
)
captionSchema.methods.generateauthtoken=function(){
    return jsonwebtoken.sign({_id:this._id},process.env.jwtsecret,{expiresIn:'24h'});

}
captionSchema.methods.comparepassword=function(password){
    return bcrypt.compare(password,this.password);
}
captionSchema.methods.hashpassword=function(password){
    return bcrypt.hash(password,10)
}
const captionmodel=mongoose.model('caption',captionSchema)
module.exports=captionmodel;