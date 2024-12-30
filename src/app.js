const express= require('express');
const app= express();

//Middlewares

const {adminAuth, userAuth}= require("./Middlewares/adminAuth")

app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res)=>{
    res.send("Got all Data");
})

app.delete("/admin/deleteData", (req, res)=>{
    res.send("Deleted Data");
})

app.get("/user/data", userAuth, (req, res)=>{
    try{
        throw new error(jsndfjnsj);
        res.send("UserData sent");
    }
    catch(err){
        res.status(500).send("Internal Server error");

    }
    
})

app.get("/user/login", (req, res)=>{

    throw new error("wdjjdn");
    res.send("User Login");
})

app.use("/", (err, req, res, next)=>{
    if(err){
        res.status(500).send("Server error");
    }
})

app.listen(7777, ()=>{
    console.log("Server runing on port 7777...");
})