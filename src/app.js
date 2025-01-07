const express= require('express');
const app= express();
require("./config/database");

const connectDB=require("./config/database")
const cookieParser=require('cookie-parser');

const authRouter = require('./routes/auth');
const profileRouter= require('./routes/profile');
const requestRouter= require('./routes/request');

app.use(express.json())
app.use(cookieParser())

connectDB().then(() => {
    console.log("Connection established successfully");
    app.listen(7777, () => {
      console.log("Server running on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Cannot connect to DB: " + err);
  });

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);








