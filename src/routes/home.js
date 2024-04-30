const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');
const homeController = require('../controllers/homeController');

router.get('/signup', homeController.signup);
router.get('/login', homeController.login);
router.get('/', HomeController.home);



module.exports = router;
