const express = require("express");
const router = express.Router();

const validFeedback = require("../additional/valid-feedback");
const invalidFeedback = require("../additional/invalid-feedback");

const Campground = require("../models/campground");

const catchAsync = require("../utils/catchAsync");

const { isLoggedIn, isAuthor, validateCamp } = require("../middleware");

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const allCamps = await Campground.find({});
    res.render("campgrounds/index", { allCamps });
  })
);

router.get("/new", isLoggedIn, (req, res, next) => {
  res.render("campgrounds/newcamp", { validFeedback, invalidFeedback });
});

router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const camp = await Campground.findById(req.params.id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!camp) {
      req.flash("error", "Can't find a campground");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { camp, validFeedback, invalidFeedback });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp) {
      req.flash("error", "Can't find a campground");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { camp, validFeedback, invalidFeedback });
  })
);

router.post(
  "/",
  isLoggedIn,
  validateCamp,
  catchAsync(async (req, res, next) => {
    const newCamp = new Campground(req.body.campground);
    newCamp.owner = req.user._id;
    await newCamp.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`campgrounds/${newCamp._id}`);
  })
);

router.put(
  "/:id",
  validateCamp,
  isAuthor,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    const camp = await Campground.findByIdAndDelete(req.params.id);
    req.flash("success", "Deleted a campground");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
