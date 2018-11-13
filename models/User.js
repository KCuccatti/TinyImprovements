const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Create a new Task Schema to map Mongo documents to an object in our node application
 */
var UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
