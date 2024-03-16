var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

// MongoDB Connection to cloud database
mongoose.connect(
  "mongodb+srv://vinayaksukhalal:12344321@cluster0.mcgbpy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    console.log("DB Connected")
});

//Schema of the User
var userSchema = mongoose.Schema({
  name: String,
  email: String,
  mobileNo: Number,
  password: String,
});

// Registering schema to mongoose
var UserModal = mongoose.model("user", userSchema);


//Different Routes


//Login Routes for Displaying Login Page
router.get("/", (req, res) => {
  res.render("login");
});

//SignUP Routes for Displaying SignUp Page
router.get("/signup", (req, res) => {
  res.render("registration");
});


router.post("/signup", async (req, res) => {
    try {
      
      var password = await bcrypt.hash(req.body.password, 10);
      var user = new UserModal({
        name: req.body.name,
        email:  req.body.email,
        mobileNo: req.body.mobileNo,
        password: password,
      });
  
      // Save the user and wait for the operation to complete
      await user.save();
  
      // Redirect after the user is successfully saved
      res.redirect("/");
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
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