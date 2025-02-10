const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter=require("./routes/user_route");
const projectRouter=require("./routes/product_route");
const requireAuth = require("./middleware/auth");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.frontend_URL, // The frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow credentials (cookies, authorization headers)
  };
  
  app.use(cors(corsOptions)); 
const uri = process.env.MONGO_URL;

// * DB CONNECTION
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connected succeffully");
});


// ! Routes
app.use('/user',userRouter);
app.use('/project',requireAuth,projectRouter);


app.listen(7000, () => {
    console.log("Server works on port 7000 ...");
  });