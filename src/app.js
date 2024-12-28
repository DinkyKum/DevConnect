const express= require('express');
const app= express();

app.use((req,res)=>{
    res.send("Main");
}) 

app.use("/Hello", (req,res)=>{
    res.send("Hello");
})

app.use("/Test", (req,res)=>{
    res.send("Test");
})


app.listen(7777, ()=>{
    console.log("Server runing on port 7777...");
})