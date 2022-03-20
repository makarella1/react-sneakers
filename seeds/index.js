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
      title: `${helper(descriptors)} ${helper(places)}`,
      location: `${cities[cityNumber].city}, ${cities[cityNumber].state}`,
      image: "https://source.unsplash.com/collection/10489597",
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
