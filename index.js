const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Joi = require("joi");

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const validFeedback = require("./additional/valid-feedback");
const invalidFeedback = require("./additional/invalid-feedback");

const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

const Campground = require("./models/campground");
const { campgroundSchema } = require("./schemas");
const Review = require("./models/review");

main()
  .then(console.log("connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.souit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const validateCamp = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("dummy");
});

app.get(
  "/campgrounds",
  catchAsync(async (req, res, next) => {
    const allCamps = await Campground.find({});
    res.render("campgrounds/index", { allCamps });
  })
);

app.get("/campgrounds/new", validateCamp, (req, res, next) => {
  res.render("campgrounds/newcamp", { validFeedback, invalidFeedback });
});

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res, next) => {
    const camp = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { camp });
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res, next) => {
    const camp = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { camp, validFeedback, invalidFeedback });
  })
);

app.post(
  "/campgrounds",
  catchAsync(async (req, res, next) => {
    const newCamp = new Campground(req.body.campground);
    await newCamp.save();
    res.redirect(`campgrounds/${newCamp._id}`);
  })
);

app.put(
  "/campgrounds/:id",
  validateCamp,
  catchAsync(async (req, res, next) => {
    const camp = await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${camp._id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res, next) => {
    const camp = await Campground.findByIdAndDelete(req.params.id);
    res.redirect("/campgrounds");
  })
);

app.post(
  "/campgrounds/:id/reviews",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);

    await campground.save();
    await review.save();

    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { message = "Something went wrong...", statusCode = 500 } = err;
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Ready to go on 3000");
});
