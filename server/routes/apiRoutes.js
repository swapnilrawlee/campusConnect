const express = require("express");
const Router = express.Router();

const { CreateSubject,ShowSubject ,studentSubject} = require('../controllers/subjectControllers.js');

Router.post('/subject',CreateSubject);
Router.get('/subject',ShowSubject);
Router.get('/studentSubject',studentSubject);

module.exports = Router;
