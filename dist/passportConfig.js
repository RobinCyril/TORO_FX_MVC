import { Strategy as LocalStrategy } from "passport-local"; // Corrected import statement
import passport from "passport";
import {userModel} from "./model/userModel.js";
import bcrypt from "bcrypt";

export const initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });

          if (!user) return done(null, false, { message: "Incorrect username" });

          const isPasswordValid = bcrypt.compareSync(password, user.password);
          if (!isPasswordValid)
            return done(null, false, { message: "Incorrect password" });
          else {
            return done(null, user);
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => { // Corrected parameter name to 'id'
  try {
    const user = await userModel.findOne({ id });
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
