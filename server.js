const express = require('express');
const app=express();

const cookieParser = require('cookie-parser');
const path=require('path');

const db= require('./config/mongoose-connection');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

const userRouter = require("./routes/userRouter");
const transcationRouter = require("./routes/transcationRouter");
const booksRouter = require("./routes/booksRouter");
app.get('/',(req,res)=>{
    res.render('index');
});

app.use("/user",userRouter);
app.use("/books",booksRouter);
app.use("/transcation",transcationRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
