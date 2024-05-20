const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');
const AuthController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const homeController = require('../controllers/homeController');

router.get('*', checkUser);
router.get('/Search-Autocomplete', homeController.SearchAutocomplete);
router.get('/autocomplete', homeController.AutoComplete);
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
router.get('/', HomeController.home);
router.get('/search', HomeController.Search);



module.exports = router;
