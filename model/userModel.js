const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //duplicates omitted

const userSchema = new mongoose.Schema({
  picture: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  //   googleId: {
  //     type: String
  //   },
  //   oAuth: {
  //     type: Boolean
  //   },
  //   favourites: {
  //     type: Array
  //   }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);