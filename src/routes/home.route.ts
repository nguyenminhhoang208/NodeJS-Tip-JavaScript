import express from 'express';
const router = express.Router();
const HomeController = require('../controllers/Home.Controller');

// [GET] /
router.get('/', HomeController.getHome);

module.exports = router;
