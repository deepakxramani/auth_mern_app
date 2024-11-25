const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
// Sign Up

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if(user) {
            return res.status(409).json({message: 'User is already exits, you can login', success: false})
        }
        const userModel = new User({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({message: "Signup successfully", success: true})
    } catch (err) {
        res.status(500)
        .json({
            message: "Internal server error",
            success: false,
        })
    }
}

// Login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMessage = "Auth failed email or password is wrong";
        if(!user) {
            return res.status(403).json({message: errorMessage, success: false})
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        if(!isPassEqual) {
            return res.status(403).json({message: errorMessage, success: false})
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200)
            .json({
                message: "Login success", 
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
        .json({
            message: "Internal server error",
            success: false,
        })
    }
}


module.exports = {
    signup,
    login
}