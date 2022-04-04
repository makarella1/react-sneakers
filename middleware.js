const ExpressError = require("./utils/ExpressError");

const { campgroundSchema, reviewSchema } = require("./schemas");

const Campground = require("./models/campground");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in!");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  if (!camp.owner.equals(req.user._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/campgrounds/${id}`);
  } else {
    next();
  }
};

module.exports.validateCamp = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/campgrounds/${id}`);
  } else {
    next();
  }
};
