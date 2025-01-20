const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const {registerUser} = require('../controllers/authController');

router.get('/',(req,res)=>{
    res.send("Hey its working ");
});

router.post('/register',registerUser);
module.exports = router;
