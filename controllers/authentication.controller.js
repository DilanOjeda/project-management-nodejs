

const passport = require('passport');
const crypto = require('crypto');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');

const { User } = require('../models');

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

const generateTokenToRestorePassword = async (req, res, next) => {
    
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    
    if ( !user) {
        req.flash( 'error', `Couldn't find this email` );
        return res.redirect( '/users/restore-password' );
    }
    // Generate token
    const token = crypto.randomBytes(20).toString('hex');
    // expiration
    const expiration = Date.now() + 3600000;    // 1 hour
    
    // Save user in the database
    user.token = token;
    user.expiration = expiration;
    await user.save();

    // Url reset  
    const urlReset = `http://${req.headers.host}/users/restore-password/${user.token}`
    
    console.log( urlReset );
    res.send( 'Please, Check yout email' );
}

const showRestorePassword = async (req, res, next) => {

    const { token } = req.params;

    const user = await User.findOne({ where: { token } });

    if ( !user ) { 
        req.flash('error', 'Token is not valid')
        return res.redirect('/users/restore-password')
    }

    res.render('reset-password', {
        namePage: 'Reset Password',
        token
    });

}

const resetPassword = async (req, res, next) => {

    const { password } = req.body; 
    const { token } = req.params;

    const user = await User.findOne({
        where: {
            token,
            expiration: {
                [Op.gte]: Date.now()
            }
        }
    });

    if ( !user ) {
        req.flash('error', 'Token is not valid');
        res.redirect('/users/restore-password')
    }

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync( password, salt );
    user.token = null;
    user.expiration = null;
    
    await user.save();
    
    req.flash('correcto', 'Your password has been modified successfully')
    res.redirect('/users/login')
}
module.exports = {
    authenticateUser,
    verifyUserAuthentication,
    generateTokenToRestorePassword,
    showRestorePassword,
    resetPassword
}