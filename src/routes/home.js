const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');
const AuthController = require('../controllers/authController');


router.post('/register', AuthController.register);
router.post('/Login', AuthController.Login);
router.get('/signup', HomeController.signup);
router.get('/login', HomeController.login);
router.get('/Recently', HomeController.Recently);
router.get('/MyQueue', HomeController.MyQueue);
router.get('/MyPodcasts', HomeController.MyPodcasts);
router.get('/Discovery', HomeController.Discovery);
router.get('/', HomeController.home);



module.exports = router;
