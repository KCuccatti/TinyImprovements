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

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/kudos_db";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = {
    User: User,
    Kudos: Kudos
}

