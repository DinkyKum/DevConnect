const express= require('express');
const app= express();
require("./config/database");

const connectDB=require("./config/database")
const User= require('./models/user')

app.use(express.json())

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
    const user= new User(req.body);
    
   try{
    await user.save();
    res.send("User Added successfully");
   } 

   catch(err){
    res.status(400).send("There is an error" + err);
   }
})


app.get('/find', async (req, res)=>{
    try{
    const user= await User.findOne({firstName:"Dinky"});
    res.send(user);
    }

    catch(err){
        res.status(400).send("There is some err" + err);
    }
})

app.get('/feed', async (req, res)=>{
    try{
    const user= await User.find({});
    res.send(user);

    }

    catch(err){
        res.status(400).send("There is some err" + err);
    }
})

app.delete('/delete', async (req, res)=>{
    try{
        const userId= req.body.id
        await User.findByIdAndDelete(userId)
    
        res.send("User Deleted Successfully");
    }

    catch(err){
        res.status(400).send("There is some err" + err);
    }
})

app.patch('/update', async (req, res)=>{
    try{
    const data= req.body;
    const userId= req.body.id;

    const updateAllowed= ["id", "gender", "age", "phtotUrl", "about", "skills"]

    const isUpdateAllowed= Object.keys(data).every((k)=>
        updateAllowed.includes(k)
    )

    if(!isUpdateAllowed){
        throw new Error("Update Not Allowed");
    }

    if(data?.skills.length>10){
        throw new Error("Skills cannot exceed 10");
    }

    const user= await User.findByIdAndUpdate(userId, data, {returnDocument:'after'}, {runValidators:'true'});
    res.send(user);
    }
    
    catch(err){
        res.status(400).send("There is some err" + err);
    }
})

app.patch('/user', async (req, res)=>{
    try{
    const data= req.body;
    const name= req.body.firstName;

    const user= await User.findOneAndUpdate({firstName: name}, data, {returnDocument:'after'}, {runValidators:'true'});
    res.send(user);
    }
    
    catch(err){
        res.status(400).send("There is some err" + err);
    }
})






