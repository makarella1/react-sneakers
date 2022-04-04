const mongoose = require("mongoose");
const Review = require("./review");

const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,
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
});

CampgroundSchema.post("findOneAndDelete", async (camp) => {
  Review.deleteMany({
    _id: {
      $in: camp.reviews,
    },
  });
});

module.exports = mongoose.model("Campground", CampgroundSchema);
