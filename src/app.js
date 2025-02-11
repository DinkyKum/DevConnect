const express= require('express');
const app= express();
require("./config/database");

require('dotenv').config()

require('dotenv').config()

require('./utils/cronjob');


const connectDB=require("./config/database")
const cookieParser=require('cookie-parser');
const cors=require('cors')

const authRouter = require('./routes/auth');
const profileRouter= require('./routes/profile');
const requestRouter= require('./routes/request');
const userRouter=require('./routes/user')

const PORT=process.env.PORT;



app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5174",
  methods: "GET,POST,PATCH,PUT,DELETE,OPTIONS",
  credentials:true,
}));


connectDB().then(() => {
    console.log("Connection established successfully");
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT + "....");
    });
  })
  .catch((err) => {
    console.error("Cannot connect to DB: " + err);
  });

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter)








