

const passport = require('passport');

const authenticateUser = passport.authenticate( 'local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    badRequestMessage: 'Both fields are required'
});

const verifyUserAuthentication = (req, res, next) => {
    // If user is authenticated 
    if ( req.isAuthenticated() ) {
        return next();
    }
    // If not 
    return res.redirect('/users/login');
}

module.exports = {
    authenticateUser,
    verifyUserAuthentication
}