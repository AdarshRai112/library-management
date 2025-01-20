const express = require('express');
const router = express.Router();
let {createAdmin,adminlogin} = require('../controllers/authController');
router.get('/',(req,res)=>{
res.send("Admin Router working");
});
router.post('/createadmin', createAdmin);
router.post('/login',adminlogin);
module.exports = router;
//we should not upload this code as public  but for your understanding i am uploading this part 