const express = require("express");
const Router = express.Router();

const { CreateSubject,ShowSubject } = require('../controllers/subjectControllers.js');

Router.post('/subject',CreateSubject);
Router.get('/subject',ShowSubject);

module.exports = Router;
