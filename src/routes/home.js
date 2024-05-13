<<<<<<< HEAD
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
router.get('/Discovery',checkUser, HomeController.Discovery);
router.get('/', HomeController.home);



module.exports = router;
=======
const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');
const AuthController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

router.get('*', checkUser);
router.post('/change-password', AuthController.ChangePassword);
router.get('/change-password', requireAuth, HomeController.ChangePassword);
router.post('/register', AuthController.register);
router.post('/Login', AuthController.Login);
router.get('/signup', HomeController.signup);
router.get('/login', HomeController.login);
router.get('/logout', HomeController.logout);
router.get('/Recently',requireAuth , HomeController.Recently);
router.get('/MyQueue',requireAuth, HomeController.MyQueue);
router.get('/MyPodcasts', requireAuth, HomeController.MyPodcasts);
router.get('/Discovery',checkUser, HomeController.Discovery);
router.get('/', HomeController.home);



module.exports = router;
>>>>>>> b1ca706f7aaab9cde5794f1db8777a182aac2907
