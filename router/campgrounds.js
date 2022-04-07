const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });

const catchAsync = require("../utils/catchAsync");

const { isLoggedIn, isAuthor, validateCamp } = require("../middleware");

const campgrounds = require("../controllers/campgrounds");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCamp,
    catchAsync(campgrounds.createCampground)
  )
  .delete(catchAsync(campgrounds.deleteCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    upload.array("image"),
    validateCamp,
    isAuthor,
    catchAsync(campgrounds.updateCampground)
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
