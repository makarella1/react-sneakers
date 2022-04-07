const Campground = require("../models/campground");

const validFeedback = require("../additional/valid-feedback");
const invalidFeedback = require("../additional/invalid-feedback");

const { cloudinary } = require("../cloudinary");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

module.exports.index = async (req, res, next) => {
  const allCamps = await Campground.find({});
  res.render("campgrounds/index", { allCamps });
};

module.exports.renderNewForm = (req, res, next) => {
  res.render("campgrounds/newcamp", { validFeedback, invalidFeedback });
};

module.exports.showCampground = async (req, res, next) => {
  const camp = await Campground.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!camp) {
    req.flash("error", "Can't find a campground");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { camp, validFeedback, invalidFeedback });
};

module.exports.renderEditForm = async (req, res, next) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  if (!camp) {
    req.flash("error", "Can't find a campground");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { camp, validFeedback, invalidFeedback });
};

module.exports.createCampground = async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();
  const newCamp = new Campground(req.body.campground);
  newCamp.geometry = geoData.body.features[0].geometry;
  const images = req.files.map((img) => ({
    url: img.path,
    filename: img.filename,
  }));
  newCamp.images = images;
  newCamp.owner = req.user._id;
  await newCamp.save();
  console.log(newCamp);
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`campgrounds/${newCamp._id}`);
};

module.exports.updateCampground = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const images = req.files.map((img) => ({
    url: img.path,
    filename: img.filename,
  }));
  campground.images.push(...images);
  await campground.save();
  if (req.body.deleteImages) {
    for (let img of req.body.deleteImages) {
      await cloudinary.uploader.destroy(img);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res, next) => {
  const camp = await Campground.findByIdAndDelete(req.params.id);
  req.flash("success", "Deleted a campground");
  res.redirect("/campgrounds");
};
