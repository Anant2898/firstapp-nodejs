import http from "http";
import gfName from "./features.js";
import { gfName1, gfName2 , generateLove} from "./features.js";
import fs from 'fs';
console.log(gfName, gfName1,gfName2, generateLove());


const server = http.createServer((req,res)=>{
    if(req.url === '/')
    {
        const home = fs.readFile("./index.html", (error,home)=>{
            console.log("reading file complete");
            res.end(home);
            console.log(home);
        });
        
    } 
    else if(req.url === '/contacts')
    {
        res.end("<h1>contacts</h1>");
    }
    else if(req.url === '/about')
    {
        res.end("<h1>about</h1>");
    }
    else
    {
        res.end("<h1>Page not found</h1>");
    }
});
server.listen(5000,()=>{
    console.log("server is working");
});