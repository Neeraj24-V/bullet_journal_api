// const passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const User = require("../models/userModel");

// // const cookieExtractor = (req) => {
// //     let token = null
// //     if(req && req.cookies) {
// //         token = req.cookies.jwt
// //     }
// //     return token
// // }

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = `${process.env.ACCESS_TOKEN_SECRET}`;
// console.log(opts.jwtFromRequest);

// const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
//   User.findOne({ _id: jwt_payload.sub }, function (err, user) {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   });
// });


// passport.use(strategy);

