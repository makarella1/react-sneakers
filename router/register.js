const express = require("express");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

const router = express.Router();

const auth = require("../controllers/auth");

router
  .route("/register")
  .get(auth.renderRegister)
  .post(catchAsync(auth.registerUser));

router
  .route("/login")
  .get(auth.renderLogin)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    auth.login
  );

router.get("/logout", auth.logout);

module.exports = router;
