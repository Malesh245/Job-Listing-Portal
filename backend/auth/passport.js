// auth/passport.js
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import { User } from "../models/user.model.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/user/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Get role from session or query parameter
          const role = req.session.role || req.query.role; // Assign a default role if not provided
          console.log(role);

          // Create a new user with the required fields
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullname: profile.displayName,
            role, // Assign a default phone number or prompt user to provide it
          });

          // Save the new user
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/v1/user/auth/github/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // Get role from session or query parameter
          const role = req.session.role || req.query.role; // Assign a default role if not provided

          // Get email if available
          const email =
            profile.emails && profile.emails[0] && profile.emails[0].value
              ? profile.emails[0].value
              : undefined;

          if (!email) {
            // Handle case where email is not available
            return done(
              new Error(
                "Email is required but not available from GitHub profile"
              ),
              false
            );
          }

          // Create a new user with the required fields
          user = new User({
            githubId: profile.id,
            email,
            fullname: profile.displayName,
            role,
          });

          // Save the new user
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
