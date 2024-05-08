const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');

const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', email: '', password: ''};

    //duplicate error code
    if(err.code == 11000){
        if(err.keyPattern.username)
            errors.username = 'that username is already registered';
        if(err.keyPattern.email)
            errors.email = 'that email is already registered';
        return errors;
    }
    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

class AuthController {
    async register(req, res){
        try {
            req.body.displayname = "123";
            const {username, email, password, displayname} = req.body;
            const newUser = new User({ username, email, password,displayname });
            const token = createToken(newUser._id);
            await newUser.save();
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
            res.status(201).json({ newUser });
        } catch (err) {
            const errors = handleError(err);
            res.status(500).json({ errors: errors });
        }
    }

    async Login(req, res){
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(!user) 
                res.status(404).json({ message: "User not found" });
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch)
                return res.status(401).json({ message: "Invalid credentials" });
            res.status(200).json({ message: "Login successful" });
        }catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    
};

const maxAge = 3600;
const createToken = (id) => {
    return jwt.sign({ id }, 'secret key', {
        expiresIn: maxAge
    });
}

module.exports = new AuthController();