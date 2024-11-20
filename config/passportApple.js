const passport = require("passport");
const AppleStrategy = require("passport-apple");
const User = require("../models/user");

passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      privateKey: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Private key from .env
      callbackURL: "/auth/apple/callback", // Apple will redirect here after login
    },
    async (accessToken, refreshToken, idToken, profile, done) => {
      try {
        // Find or create the user in the database
        let user = await User.findOne({ appleId: profile.id });
        if (!user) {
          user = await User.create({
            appleId: profile.id,
            email: profile.email,
            firstName: profile.name?.firstName || "Unknown",
            lastName: profile.name?.lastName || "Unknown",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user to store user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user to retrieve user data from the ID stored in the session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
