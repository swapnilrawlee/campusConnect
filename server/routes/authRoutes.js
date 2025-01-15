const express = require("express");
const Router = express.Router();
const { adminLogin, Login } = require("../controllers/authController.js");

Router.post("/login", Login);
Router.post("/adminlogin", adminLogin);

module.exports = Router;
