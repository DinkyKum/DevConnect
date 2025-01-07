const express= require('express');
const requestRouter= express.Router();
const {userAuth}=require('../Middlewares/auth')

requestRouter.get('/sendRequest', userAuth, async (req, res)=>{
    console.log("Sending request");
    res.send("Request Sent");
})

module.exports= requestRouter;

