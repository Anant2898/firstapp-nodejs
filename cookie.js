import express from "express"; 
import  path  from "path";
import mongoose, { Schema } from "mongoose";
import cookieParser from "cookie-parser";

// using middleware for post request
server.use(express.urlencoded({extended:true}));
//using middle ware for parsing cookies
server.use(cookieParser());


const user = mongoose.model("User" /* collections name */, userSchema);
const isAuth = (req,res,next)=>{
    const {token} = req.cookies;
    if(token)
    {
        next();
    }
    else
    {
        res.render("login.ejs"); 
        
    }
};
server.get("/",isAuth,(req,res)=>
{

    res.render("logout.ejs");
        
}); 

server.post("/logout",(req,res)=>{
   // console.log("irun");
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now())
    });
    res.redirect("/");
});

server.get("/success",(req,res)=>{
    const pathloc = path.resolve();
    res.sendFile(path.join(pathloc,"success.html"));
});


server.post("/login",   (req,res)=>{
    res.cookie("token","iamin",{
        httpOnly:true,expires:new Date(Date.now()+60*1000)
    });
    //console.log(Date.now());
    res.redirect("/");       
});


server.get("/users", (req,res)=>{
 res.json({
    users
 });
});


server.listen(5000,()=>{
    console.log("server is working");
});