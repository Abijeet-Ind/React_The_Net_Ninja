const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: [true, 'EMAIL IS REQUIRE'],
    }, 
    name:{
        type: String,
        unique: true,
        require: [true, 'NAME IS REQUIRED']
    },
    password:{
        type: String,
        require: [true, 'PASSWORD IS REQUIRED'],
        select: false
    },
    passwordConfirm:{
        type: String,
        validate:{
            validator: function(el){
                return el === this.password;
            },
            message: 'password does not match'
        },
        require: [true, 'PASSWORD IS REQUIRED'],
    }
})

userSchema.pre('save', async function(next){
    // encoding the password
    this.password = await bcrypt.hash(this.password, 12);

    //removing the confirm password
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.checkPassword = async function(enteredPassword, dbPassword){
    return await bcrypt.compare(enteredPassword, dbPassword);
}

const usermodel = mongoose.model('usermodel', userSchema);
module.exports = usermodel;