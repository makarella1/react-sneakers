const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

main()
  .then(console.log("connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.souit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
}

const helper = (array) => array[Math.floor(Math.random() * array.length)];

const seedDatabase = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i <= 50; i++) {
    const cityNumber = Math.floor(Math.random() * 1000);
    const newCamp = new Campground({
      owner: "62486209b2749c16095d86bf",
      title: `${helper(descriptors)} ${helper(places)}`,
      location: "Kyiv, UA",
      geometry: { type: "Point", coordinates: [30.5234, 50.4501] },
      images: [
        {
          url: "https://res.cloudinary.com/dsb8qkzzv/image/upload/v1649257514/buddies-campin/ug74jzvzqf9dmrjyvh2x.jpg",
          filename: "buddies-campin/ug74jzvzqf9dmrjyvh2x",
        },
        {
          url: "https://res.cloudinary.com/dsb8qkzzv/image/upload/v1649257514/buddies-campin/jupndxp4jkl3e3yxs3jn.jpg",
          filename: "buddies-campin/jupndxp4jkl3e3yxs3jn",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae inventore enim, quam voluptas nam illo, est deleniti id reprehenderit aut totam! Est impedit eos porro quis atque eveniet numquam recusandae?",
      price: Math.floor(Math.random() * 20) + 10,
    });
    await newCamp.save();
  }
};

seedDatabase();

seedDatabase().then(() => {
  mongoose.connection.close();
});
