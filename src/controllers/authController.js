const bcrypt = require('bcrypt');
const User = require('../models/users');
const { mutipleMongooseToObject, mongooseToObject } = require('../until/mongoose');

class AuthController {
    async register(req, res){
        try {
            req.body.displayname = "123";
            const {username, email, password, displayname} = req.body;

            const existingUser = await User.findOne({ email });
            if(existingUser)
                return res.status(400).json({ message: "Email already exists" });

            const newUser = new User({ username, email, password,displayname });

            await newUser.save();
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Internal server error" });
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

module.exports = new AuthController();