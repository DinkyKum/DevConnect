const validator=require('validator')

const validateSignupData=(req)=>{
    const {firstName, lastName, emailId, password}=req.body;

    if(!(firstName || lastName)){
        throw new Error("Invalid Name");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid EmailId");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a Strong password");
    }
}

module.exports={validateSignupData};