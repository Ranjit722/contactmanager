const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatiry !");
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exist");
    }

    //Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Passsword: ", hashPassword);
    //Create user
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });

    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, emai: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not Valid");
    }
    res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async(req, res) => {
    res.json({ message: "Login user" });
});

//@desc Current user info
//@route POST /api/user/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser};
