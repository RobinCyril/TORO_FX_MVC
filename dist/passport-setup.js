const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const userModel = require('./model/model');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
