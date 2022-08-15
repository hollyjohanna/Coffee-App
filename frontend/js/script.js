// const result = document.getElementById("result");
// const server = "http://localhost:3001";

// const { $where } = require("../../backend/models/coffee");

// const latte = {
//   name: "Latte",
//   price: 4.0,
//   image_url:
//     "https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg",
// };

// // CREATE A NEW COFFEE AND SAVE TO DB
// const newCoffeeBtn = document.getElementById("new-coffee");

// newCoffeeBtn.onclick = function () {
//   $.ajax({
//     url: `${server}/addCoffee`,
//     type: "POST",
//     data: latte,
//     success: function (data) {
//       console.log("Coffee added");
//       console.log("Added a new coffee to database");
//       console.log(data);
//     },
//     error: function () {
//       console.log("Error: cannot call API");
//     },
//   });
// };

// // SHOW ALL COFFEE
// $.ajax({
//   type: "GET",
//   url: server + "/allCoffee",
//   success: function (data) {
//     console.log(data);
//     showCoffee(data);
//   },
//   error: function (error) {
//     console.log(error);
//   },
// });

// showCoffee = (allCoffee) => {
//   let renderCoffee = (item) => {
//     result.innerHTML += `
//     <div class="coffee-item">
//       <img src="${item.image_url}" alt="${item.name}">
//       <h4>${item.name}</h4>
//       <p>${item.price}</p>
//     </div>
//     `;
//   };
//   allCoffee.forEach(renderCoffee);
// };

const result = document.getElementById("result");
const server = "http://localhost:3100";

console.log("hello");
const goBtn = document.getElementById("add-coffee");

// Declare our inputs
const nameInput = document.getElementById("coffee-name-input");
const priceInput = document.getElementById("price-input");
const imageURLInput = document.getElementById("image-url-input");

//setting up our coffee data
const longBlack = {
  name: "Long Black",
  price: 3.8,
  image_url:
    "https://whitehorsecoffee.com.au/wp-content/uploads/2016/09/unnamed-6.jpg",
};

goBtn.onclick = () => {
  console.log("clicked");
  $.ajax({
    url: server + "/addCoffee",
    type: "POST",
    data: {
      //parameters must match the schema exactly
      name: nameInput.value,
      price: priceInput.value,
      image_url: imageURLInput.value,
    },
    success: () => {
      console.log("A new coffee was added");
    },
    error: () => {
      console.log("Error: Cannot reach the backend");
    },
  });
};

let renderCoffees = (coffees) => {
  console.log("The render coffee function is running");

  coffees.forEach((item) => {
    result.innerHTML += `
      <div>
      <img src="${item.image_url}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}<p> 
      </div>
      `;
  });
  // console.log(coffees)
};

$.ajax({
  type: "GET",
  url: "http://localhost:3100/allCoffee",
  success: (data) => {
    console.log(data);
    renderCoffees(data);
  },
  error: (error) => {
    console.log(error);
  },
});
