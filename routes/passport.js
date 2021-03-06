const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../model/userModel");
//const User = mongoose.model("user");
const key = require("../keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;
module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

// module.exports = passport.use(
//   new JwtStrategy(opts, (jwt_payload, done) => {
//     // jwt used for authentification
//     console.log("req", req);
//     user
//       .findById(jwt_payload.id) // if find the user, return the user, if not, return false
//       .then(user => {
//         if (user) {
//           return done(null, user);
//         }
//         return done(null, false);
//       })
//       .catch(err => console.log(err));
//   })
// );
