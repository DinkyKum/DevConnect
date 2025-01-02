const mongoose= require("mongoose");

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://dinky:mJ32TSatoRGX0hUz@namastenode.399mh.mongodb.net/DevConnect")
}

module.exports=connectDB

