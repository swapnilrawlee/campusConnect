const express = require("express");
const Router = express.Router();
const {staffbasicinfo,staffadditionalinfo} = require("../controllers/staffController.js");

Router.post("/staffbasicinfo", staffbasicinfo);
Router.post("/staffadditionalinfo", staffadditionalinfo);

module.exports = Router;
