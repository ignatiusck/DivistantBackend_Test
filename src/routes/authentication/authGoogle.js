const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const googleAuth = require("../../controllers/authentication/authGoogle");

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "524213267958-5eejbbj2vfubf8nme46ufor6nt078mfd.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  googleAuth.getResult
);

router.get("/signout", googleAuth.signout);

module.exports = router;
