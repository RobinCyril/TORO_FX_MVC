const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
const userModel = require('./model/model.js');
dotenv.config({ path: "./config.env" });

module.exports = function(passport) {
  console.log('Setting up JWT strategy...'); // Testing console.log

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  //   issuer: 'robin.cyril@appsimagica.com',
  //  audience :'yoursite.net',
  };
  
  passport.use(new jwtStrategy(opts, async (jwt_payload, done) => {
    console.log('JWT payload:', jwt_payload);
  
    try {
      const user = await userModel.findById(jwt_payload.userID).exec(); // Use await here
      console.log('User found:', user);
  
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      console.log('Error finding user:', error);
      done(error, false);
    }
  }));
};
