const express = require('express');
const Router = express.Router();
const {adminLogin} = require('../controllers/authController.js');

Router.post('/adminlogin',adminLogin);

module.exports = Router;