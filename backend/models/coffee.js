// Here is our first schema
// Every schema needs the mongoose dependency

const mongoose = require("mongoose");

// Set up the properties of our schema
const coffeeSchema = new mongoose.Schema(
  {
    // every schema requires and ID
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    image_url: String,
  },
  {
    //Version keys can help us with updated schemas for larger projects
    versionKey: false,
  }
);

// set up an export telling this .js file to be sent to our main index.js
// First argument is the name of the schema
// This word is up to up to us, but should reflect the type of data (singlar)
// The second argument is the schema variable we declared above.
module.exports = mongoose.model("Coffee", coffeeSchema);
