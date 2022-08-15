// Set Up Variables for Express
const express = require("express");
const app = express();
const port = 3100;

// Dependancies
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// Grab our config file
const config = require("./config.json");

// Schemas
//Every schema needs a capital letter
const Coffee = require("./models/coffee.js");

// Start our dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Start Our Server
app.listen(port, () => {
  console.log(Coffee);
  console.log(`Server is running on port ${port}`);
});

// Lets connect to mongoDB cloud
// Cluster name: cluster0
mongoose
  .connect(
    `mongodb+srv://${config.username}:${config.password}@cluster0.hytge1o.mongodb.net/?retryWrites=true&w=majority`
    // .then is a chaining method used with promises
    // in simple terms, it will run something after the function before it
  )
  .then(() => {
    console.log(`You've connected to mongoDB`);
    // .catch is a method to 'catch' any errors which might happen in a promise
  })
  .catch((err) => {
    console.log(`Database connection error ${err.message}`);
  });

// Set up a route/endpoint which the frontend will access
// app.post will send data to the database
app.post("/addCoffee", (req, res) => {
  //create a new instance of the coffee schema
  const newCoffee = new Coffee({
    //give our new coffee the details we sent from the front end
    _id: new mongoose.Types.ObjectId(),
    // the data will always be sent to req.body
    name: req.body.name,
    price: req.body.price,
    image_url: req.body.image_url,
  });
  // to save the newcoffee to the database
  // use the variable declared above
  newCoffee
    .save()
    .then((result) => {
      console.log(`Added a new coffee successfully!`);
      res.send(result);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
});

//Here were setting up the allCoffee route
app.get("/allCoffee", (req, res) => {
  Coffee.find()
    //.then is methond in which we can chain functions on
    //chaining means that once someting has run then we can run another thing
    // the result varibale is being returned by the .find() that we ran earlier
    .then((result) => {
      //send back the result to the front end
      res.send(result);
    });
});
