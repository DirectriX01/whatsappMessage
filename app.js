const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    session = require('express-session');

// limit: '50mb' is required to upload large files
app.use(bodyParser.json({ limit: '50mb' }));
// extended: true is required to parse nested objects
app.use(bodyParser.urlencoded({ extended: true }));

// multercode to upload files
require('./config/multer');



const userRoutes = require("./routes/user");
const groupRoutes = require("./routes/group");

app.use(userRoutes);
app.use(groupRoutes);




const MONGODB_URI = "mongodb+srv://root:root@cluster0.a4i9ino.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
      console.log('connected to mongodb');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
    
  });