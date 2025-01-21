const express = require("express");
const Router = express.Router();
const {staffbasicinfo,staffadditionalinfo,staffCount,staffFullDetails,staffdetails} = require("../controllers/staffController.js");

Router.post("/staffbasicinfo", staffbasicinfo);
Router.post("/staffadditionalinfo", staffadditionalinfo);
Router.get("/staffCount", staffCount);
Router.get("/staffFullDetails", staffFullDetails);
Router.get("/staffdetails", staffdetails);


module.exports = Router;
