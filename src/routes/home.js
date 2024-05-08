const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');
const AuthController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

router.get('*', checkUser);
router.post('/register', AuthController.register);
router.post('/Login', AuthController.Login);
router.get('/signup', HomeController.signup);
router.get('/login', HomeController.login);
router.get('/logout', HomeController.logout);
router.get('/Recently',requireAuth , HomeController.Recently);
router.get('/MyQueue',requireAuth, HomeController.MyQueue);
router.get('/MyPodcasts', requireAuth, HomeController.MyPodcasts);
router.get('/Discovery', HomeController.Discovery);
router.get('/', HomeController.home);



module.exports = router;
