const express = require('express');
const Router = express.Router();

const { studentprofile ,academicdetails,studentfulldetail,studentCount,emergencycontact,skillsandlanguages } = require('../controllers/studentController.js');

Router.post('/studentprofile',studentprofile);
Router.post('/academicdetails',academicdetails);
Router.post('/skillsandlanguages',skillsandlanguages);
Router.post('/emergencycontact',emergencycontact);
Router.post('/emergencycontact',emergencycontact);
Router.get('/studentfulldetail',studentfulldetail);
Router.get('/studentCount',studentCount);

module.exports = Router;