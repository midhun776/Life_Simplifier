var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

// MongoDB Connection to cloud database
mongoose.connect(
  "mongodb+srv://vinayaksukhalal:<password>@cluster0.mcgbpy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

//Schema of the User
var userSchema = mongoose.Schema({
  name: String,
  email: String,
  mobileNo: Number,
  password: String,
  confirmpassword: String,
});

// Registering schema to mongoose
var UserModal = mongoose.model("user", userSchema);


//Different Routes


//Login Routes for Displaying Login Page
router.get("/", (req, res) => {
  res.render("login", { status: "ok" });
});

//SignUP Routes for Displaying SignUp Page
router.get("/signup", (req, res) => {
  res.render("registration");
});


router.post("/login", async (req, res) => {
  console.log(req.body);
  var user = await UserModal.findOne({ email: req.body.email });

  if (user) {
    bcrypt.compare(req.body.password, user.password).then((response) => {
      if (response) {
        email = user.email;
        res.redirect(`/home?email=${user.email}`);
      } else {
        res.render("LoginPage", { status: "Password is Wrong" });
      }
    });
  } else {
    res.render("LoginPage", { status: "UserName is Wrong" });
  }
});

//Home Routes for Displaying HomePage Page
router.get("/home", async (req, res) => {
    const userEmailFromQuery = req.query.email;
    console.log(userEmailFromQuery);
    var user = await UserModal.findOne({ email: userEmailFromQuery });
    // Set user details in local storage
    res.render("Home", { user: user });
  });
  module.exports = router