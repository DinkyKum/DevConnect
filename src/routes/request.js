const express= require('express');
const requestRouter= express.Router();
const {userAuth}=require('../Middlewares/auth');
const ConnectionRequest= require('../models/connectionRequest');
const User = require('../models/user')

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res)=>{
    try{
    const fromUserId= req.user._id;
    const toUserId= req.params.toUserId;
    const status= req.params.status;

    const toUser= await User.findById(toUserId);
    if(!toUser){
        return res.status(404).send("User doesnt exists");
    }

    const validStatus=["ignored", "interested"]

    const isStatusValid= validStatus.includes(status);
    if(!isStatusValid){
        throw new Error("Invalid status ")
    }

    const isConnectionRequestDuplicate= await ConnectionRequest.findOne({
        $or:[{fromUserId, toUserId}, {fromUserId:toUserId, toUserId:fromUserId}]
    })

    if(isConnectionRequestDuplicate){
        throw new Error("Connection Request already exists");
    }

    const connectionRequest= new ConnectionRequest({fromUserId, toUserId, status});
    await connectionRequest.save();

    res.send("Connection Request sent Succesfully");
}

catch(err){
    res.status(400).send("There is some error"+ err);
}
})



module.exports= requestRouter;

