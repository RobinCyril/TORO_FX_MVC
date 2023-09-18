import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import {userModel} from './model/model.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: "906896007622-ul6iab05pivq0seimrk8fe3j986itfgp.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/google/callback",
      passReqToCallback: true, // Passes the request object to the callback
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      
      // Here you can use the request, accessToken, and refreshToken parameters as needed
      // For example, you can access the user's IP address from the request object
      const userIpAddress = request.ip;
      console.log(`User IP address: ${userIpAddress}`);
      
      // You can also use the access token and refresh token if needed
      console.log(`Access Token: ${accessToken}`);
      console.log(`Refresh Token: ${refreshToken}`);
      
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await userModel.findOne({ email });
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
