"use strict";
var dotenv = require('dotenv').config();
var fs = require("fs");
var path = require("path");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
console.log("The Environment is: " + env);
var config = require(__dirname + '/../config/config.js')[env];

const mongoose = require('mongoose');
const User = require('./User.js');
const Kudos = require('./Kudos.js')

module.exports = {
    User: User,
    Kudos: Kudos
}

if (env==="production") {
  console.log("Using PROD STUFF");
  console.log("Using Environment Variables");
  console.log("User Name: " + process.env.MONGO_PROD_USER);
  console.log("Database: " + process.env.MONGO_PROD_DBNAME);
  console.log("Host: " + process.env.MONGO_PROD_HOST);
  console.log("THE DATABSE: " + config.database);

  var dbUrl = 'mongodb://' + process.env.MONGO_PROD_USER +":" + process.env.MONGO_PROD_KEY + "@" + 
  process.env.MONGO_PROD_HOST + "/" + process.env.MONGO_PROD_DBNAME + "?authSource=yourDB&w=1";
  console.log(dbUrl);

  mongoose.connect(dbUrl, { useNewUrlParser: true });
  
} else {
  console.log("Using DEV stuff");
  console.log("Using Environment Variables");
  console.log("Database: " + process.env.MYSQL_DEV_DBNAME);
  console.log("Host: " + process.env.MYSQL_DEV_HOST);
  console.log("Getting ready to connect to db...");
  mongoose.connect('mongodb://localhost/kudos_db', { useNewUrlParser: true });
}

