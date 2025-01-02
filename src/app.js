const express= require('express');
const app= express();
require("./config/database");

const connectDB=require("./config/database")
const User= require('./models/user')

connectDB().then(() => {
    console.log("Connection established successfully");
    app.listen(7777, () => {
      console.log("Server running on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Cannot connect to DB: " + err);
  });


app.post('/signup', async (req, res)=>{
    const user= new User({
        firstName:"ABC",
        lastName:"Kumar",
        contact:83492749234,
        age:20
    })
    
   try{
    await user.save();
    res.send("User Added successfully");
   } 

   catch(err){
    console.error("There is an error" + err);
   }
})






