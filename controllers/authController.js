const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
                    res.send("user created succesfully");
                }
            })
        })
    }
    catch (err) {
        res.send(err.message);
    }
}
module.exports = {registerUser};