import express from "express"; 
import  path  from "path";
import mongoose, { Schema } from "mongoose";


const server = express();


mongoose.connect("mongodb://localhost:27017", {dbName:"backend"})
.then(()=>console.log("backend database connected"))
.catch(e=> console.log(e));


const messageSchema = new mongoose.Schema({
    name:String,
    email:String
});


const users = [];
// using middleware for post request
server.use(express.urlencoded({extended:true}));

const Message = mongoose.model("Msg" /* collections name */, messageSchema);
server.get("/",(req,res)=>{
    res.render("login.ejs"); 
});


server.get("/success",(req,res)=>{
    const pathloc = path.resolve();
    res.sendFile(path.join(pathloc,"success.html"));
});


server.post("/contact",async (req,res)=>{
    //await Message.create({name:" singhal",email:"developer@gmail.com"});
    const msg = {name:req.body.name, email:req.body.email};
    await Message.create(msg);
    res.redirect("/success"); 
       
})


server.get("/users", (req,res)=>{
 res.json({
    users
 });
});


server.listen(5000,()=>{
    console.log("server is working");
});