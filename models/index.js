"use strict";

const mongoose = require('mongoose');
const User = require('./User.js');
const Kudos = require('./Kudos.js')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/kudos_db";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = {
    User: User,
    Kudos: Kudos
}

