const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const {registerUser,loginUser,logout} = require('../controllers/authController');
let isLoggedIn = require('../middlewares/isLoggedIn');
router.get('/',(req,res)=>{
    res.send("Hey its working ");
});
router.get('/home',(req,res)=>{
    res.send("Chal raha hai ");
});
router.get('/logout',isLoggedIn,logout);

router.post('/register',registerUser);
router.post('/login',loginUser);
module.exports = router;
