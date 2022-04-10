const mongoose = require("mongoose");
const Review = require("./review");

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema(
  {
    title: String,
    price: Number,
    description: String,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        reguired: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [ImageSchema],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  opts
);

CampgroundSchema.virtual("properties.popupMarkup").get(function () {
  return `<strong><a href=/campgrounds/${
    this._id
  }><p>${this.title}</p></a></strong><p>${this.description.substring(0, 20)}...</p>`;
});

CampgroundSchema.post("findOneAndDelete", async (camp) => {
  Review.deleteMany({
    _id: {
      $in: camp.reviews,
    },
  });
});

module.exports = mongoose.model("Campground", CampgroundSchema);
