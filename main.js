var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
mongoose.connect("mongodb+srv://vinayaksukhalal:<password>@cluster0.mcgbpy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
var userSchema = mongoose.Schema({
  name:String,
  email:String,
  mobileNo:Number,
  password:String,
  confirmpassword:String
});
var UserModal = mongoose.model("user", userSchema);


router.get("/", (req, res) => {
  res.render("LoginPage", { status: "ok" });
});