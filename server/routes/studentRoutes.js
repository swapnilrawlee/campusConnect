const express = require('express');
const Router = express.Router();

const { studentprofile ,academicdetails,studentfulldetail,emergencycontact,skillsandlanguages } = require('../controllers/studentController.js');

Router.post('/studentprofile',studentprofile);
Router.post('/academicdetails',academicdetails);
Router.post('/skillsandlanguages',skillsandlanguages);
Router.post('/emergencycontact',emergencycontact);
Router.get('/studentfulldetail',studentfulldetail);

module.exports = Router;