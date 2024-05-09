const jwt = require('jsonwebtoken');
const User = require('../models/users');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check jwt exists & is verified
    if(token){
        jwt.verify(token, 'secret key', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    //check jwt exists & is verified
    if(token){
        jwt.verify(token, 'secret key', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
}

const getUserIdFromToken = async (token) => {
    if (!token) {
      return null; 
    }
  
    try {
      const decodedToken = await jwt.verify(token, 'secret key');
      return decodedToken.id;
    } catch (err) {
      console.error('Error verifying JWT:', err.message);
      return null; 
    }
  };
module.exports = { requireAuth, checkUser, getUserIdFromToken };