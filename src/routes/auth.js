const express= require('express');
const authRouter= express.Router();
const {validateSignupData}=require('../utils/validation')
const bcrypt = require('bcrypt');
const User= require('../models/user')


authRouter.post('/signup', async (req, res)=>{
    try{
      validateSignupData(req);
      const {firstName, lastName, emailId, password, gender, age, photoUrl, skills}= req.body;
  
      const Hashpassword= await bcrypt.hash(password, 10)
  
      const user= new User({
          firstName, lastName, emailId, password:Hashpassword, gender, age, photoUrl, skills
      });
      
      await user.save();
      res.send("User Added successfully");
     } 
  
     catch(err){
      res.status(400).send("There is an error" + err);
     }
  })
  
authRouter.get('/login', async(req, res)=>{
      try{
          const {emailId, password}= req.body;
          const user= await User.findOne({emailId: emailId});
  
          if(!user){
              throw new Error("Invalid Credentials")
          }
          const isPasswordValid= await user.validatePassword(password);
  
          if(isPasswordValid){
              const token= await user.getJWT();
  
              res.cookie("token", token);
              res.send("Login Successful");
          }
  
          else{
              throw new Error("Invalid Credentials")
          }
      }
      catch(err){
          res.status(400).send("There is some error" + err);
      }
  })

module.exports= authRouter;