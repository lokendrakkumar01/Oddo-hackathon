const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../model/user");


// SIGNUP PAGE
router.get("/signup",(req,res)=>{
    res.render("auth/signup");
});


// SIGNUP
router.post("/signup", async(req,res)=>{

    const {name,email,password}=req.body;

    const hash = await bcrypt.hash(password,10);

    const user = new User({

        name,
        email,
        password:hash

    });

    await user.save();

    res.redirect("/signin");

});


// SIGNIN PAGE
router.get("/signin",(req,res)=>{

    res.render("auth/signin");

});


// SIGNIN
router.post("/signin", async(req,res)=>{

    const {email,password}=req.body;

    const user = await User.findOne({email});

    if(!user){

        return res.send("User Not Found");

    }

    const valid = await bcrypt.compare(password,user.password);

    if(!valid){

        return res.send("Wrong Password");

    }

    req.session.user={

        id:user._id,
        name:user.name,
        email:user.email

    };

    res.redirect("/dashboard");

});


// DASHBOARD
router.get("/dashboard",(req,res)=>{

    if(!req.session.user){

        return res.redirect("/signin");

    }

    res.render("dashboard",{

        user:req.session.user

    });

});


// LOGOUT
router.get("/logout",(req,res)=>{

    req.session.destroy(()=>{

        res.redirect("/signin");

    });

});

module.exports=router;