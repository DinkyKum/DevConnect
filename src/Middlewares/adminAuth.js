const adminAuth=  (req, res, next)=>{
    const token= "xyz";
    const isAuthorized= token==="xyz";

    if(!isAuthorized){
        res.status(401).send("Unauthorised Access");
    }
    else next(); 
}


const userAuth=  (req, res, next)=>{
    const token= "xy";
    const isAuthorized= token==="xy";

    console.log("Checking authorisation....")

    if(!isAuthorized){
        res.status(401).send("Unauthorised Access");
    }
    else next(); 
}

 module.exports={
    adminAuth,
    userAuth
 }