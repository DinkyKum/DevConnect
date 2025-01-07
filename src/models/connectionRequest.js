const mongoose= require('mongoose');

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },

    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },

    status:{
        type:String,
        enum:["interested", "ignored", "accepted", "rejected"],
    },
},

{
    timestamps:true
}
)

connectionRequestSchema.pre("save", function(){
    const connectionRequest= this;
    if(connectionRequest.fromUserId.equals(this.toUserId)){
        throw new Error("You cannot send request to yourself");
    }
    next();
})

connectionRequestSchema.index({toUserId:1, fromUserId:1});

module.exports= mongoose.model("ConnectionRequest", connectionRequestSchema);