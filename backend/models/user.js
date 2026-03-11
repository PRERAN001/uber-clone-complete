const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");

const userschema = new mongoose.Schema({
    
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
    }
});


userschema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


userschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


userschema.methods.generateAuthToken = function () {
    return jsonwebtoken.sign({ _id: this._id }, process.env.jwtsecret,{expiresIn:'24h'});
};

const usermodel = mongoose.model("user", userschema);
module.exports = usermodel;
