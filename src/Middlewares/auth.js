const jwt=require('jsonwebtoken');
const User= require('../models/user')

const userAuth= async (req, res, next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Token Not Found")
    }
    const decodedData=await jwt.verify(token, 'DevConnect@123');
    const {_id}=decodedData;

    const user= await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user=user;
    next();
}
    catch(err){
        res.status(400).send("There is some error"+ err);
    }
}

module.exports={userAuth}