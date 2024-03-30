import express from "express"; 
import  path  from "path";
import mongoose, { Schema } from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const server = express();


mongoose.connect("mongodb://localhost:27017", {dbName:"backend"})
.then(()=>console.log("backend database connected"))
.catch(e=> console.log(e));


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});



// using middleware for post request
server.use(express.urlencoded({extended:true}));
//using middle ware for parsing cookies
server.use(cookieParser());


const User = mongoose.model("user" /* collections name */, userSchema);


const isAuth = async (req,res,next)=>{
    const {token} = req.cookies;
    if(token)
    {
        const decoded = jwt.verify(token,"sdsjkdnsd");
        req.user = await User.findById(decoded._id);
        next();
    }
    else
    {
        
        res.render("login.ejs"); 
        
    }
};
server.get("/",isAuth,(req,res)=>
{

    res.render("logout.ejs",{name:req.user.name});
        
});

server.get("/register",(req,res)=>
{

    res.render("register.ejs");
        
});

//on form page user hits login button
server.post("/login", async(req,res)=>{
    const {name,email,password} = req.body;
    let user = await User.findOne({email});
    if(!user)
    {
        res.redirect("/register");
        return;
    }
    const ismatch = await bcrypt.compare(password,user.password)
    if(!ismatch )
    {
        const message = "Incorrect password!";
        res.render("login.ejs", { message, email});

        //  res.render("logout.ejs",{name:req.user.name});
        return;
    }
    const token = jwt.sign({_id:user._id},"sdsjkdnsd");
    res.cookie("token",token, {
        httpOnly:true,expires:new Date(Date.now()+60*1000)
    });
    
    
    res.redirect("/");       
});

//user hits logout button on logout page
server.post("/logout",(req,res)=>{
   
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now())
    });
    
    res.redirect("/");
});

//when user hits signup on register page
server.post("/register", async(req,res)=>{
    const {name,email,password} = req.body;
    let user = await User.findOne({email});
    console.log(user);
    if(user)
    {

        res.redirect("/");
        return;
    }
    const hashedpassword = await bcrypt.hash(password,10);
    user = await User.create({
        name,
        email,
        password:hashedpassword
    });
       

    res.redirect("/");
});
server.listen(5000,()=>{
    console.log("server is working");
});