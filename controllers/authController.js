const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { generateToken } = require("../utils/generateToken");

let createAdmin = async (req,res)=>{
    try {
        let { name, email, password } = req.body;
        let existingOwner = await userModel.findOne({role:"admin"});
        if(existingOwner)
            return res.status(400).send("Admin Already exist");
        let admin = await userModel.findOne({ email });
        if (admin)
            return res.status(400).send("This user already exist");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let createdAdmin = await userModel.create({
                        name,
                        password: hash,
                        email,
                        role: "admin"
                    });
                    let token = generateToken(createdAdmin);
                    res.cookie("token", token);
                    res.send("admin created succesfully");
                }
            })
        })
    }
    catch (err) {
        res.send(err.message);
    }
}

let adminlogin = async (req,res)=>{
    try {
        let { email, password } = req.body;
        let admin = await userModel.findOne({role:"admin"});
        if (email!==admin.email) {
            req.send("Email or passowrd Incorrect");
            return res.redirect("/adminlogin");
        }
        bcrypt.compare(password, admin.password, (err, result) => {
            if (!result) {
                res.send("email or password Incorrect");
                // return res.redirect("/adminlogin");
            }
            else {
                let token = generateToken(admin);;
                res.cookie("token", token);
                res.send("admin login successfull");
            }
        });


    }
    catch (err) {
        res.send(err.message);
    }
}
let registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user)
            return res.status(400).send("This user already exist");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let createdUser = await userModel.create({
                        name,
                        password: hash,
                        email,
                    });
                    let token = generateToken(createdUser);
                    res.cookie("token", token);
                    res.send("user created succesfully");
                }
            })
        })
    }
    catch (err) {
        res.send(err.message);
    }
}

let loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email,role:"user" });
        if (!user) {
            res.send("Email or passowrd Incorrect");
            // return res.redirect("/");
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return res.send( "email or password Incorrect");
            }
            else {
                let token = generateToken(user);
                res.cookie("token", token);
                res.send("login successfull");
            }
        });


    }
    catch (err) {
        res.send(err.message);
    }
}
let logout = async (req,res)=>{
    res.clearCookie("token");
    res.send("logout successfull");
}
module.exports = {registerUser,loginUser,createAdmin,adminlogin,logout};