const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: [true, 'Please enter an username'], 
        unique: true 
    },
    email: { 
        type: String, 
        required: [true, 'Please enter an email'], 
        unique: true,
        validate: [isEmail, "Please enter a valid email"] 
    },
    password: { 
        type: String, 
        required: [true, 'Please enter a password'], 
        minLength: [8, 'Minimum password length is 8 characters'] 
    },
    displayname: String
});

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) 
        return next();
    const hash = await  bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

module.exports = mongoose.model('User', userSchema);