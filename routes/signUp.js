const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const { check, validationResult } = require("express-validator");

router.post("/signUp", (req, res) => {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var passwordRepeat = req.body.passwordRepeat;

  //Validation

  check("email", "Email is required").notEmpty();
  check("email", "Email is not valid").isEmail();
  check("username", "Username is required").notEmpty();
  check("password", "Password is required").notEmpty();
  check("passwordRepeat", "Passwords do not match").equals(req.body.password);

  var errors = validationResult(req);
  // Form validation
  console.log("i am in the sign up route"); // we will see it if we post in postman /signUp/signUp and will show up in terminal
  // Check validation
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  } // now use const email in findOne method to check whether user already exists in our user collection (database)
  //first check whether user already exists

  userModel.findOne({ email }).then(user => {
    if (user) {
      // if user already exits, send error message and error code status(type of error) .json(message you want the user to see)
      return res.status(400).json({ email: "Email already exists" });
    } else {
      // only if user does not already exist, create new user
      const newUser = new userModel({
        username,
        email,
        password,
        passwordRepeat
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save() // mongoose function taht allows us to take the new user and save it in the database
            .then(user => res.json(user)) // we are sending this message to the front end in a json format
            .catch(err => res.send(err)); // send the error to front end if there is any
          console.log(newUser);
        });
      });
    }
  });
});

module.exports = router;
