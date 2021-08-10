const { Router } = require('express');
const router = Router();

const { goToSignin, createUser, login, closeSession, showAskRestoreForm } = require('../controllers/users.controller')
const { 
    authenticateUser, 
    generateTokenToRestorePassword, 
    showRestorePassword, 
    resetPassword,
    confirmEmail } = require('../controllers/authentication.controller');

// To go to sign in web page
router.get( '/users/sign-in', goToSignin );

// To create a new user
router.post( '/users/create-user', createUser );

// To go to log in web page and also to log in to Project Management
router.get( '/users/login', login );

// To authentica User
router.post('/users/login', authenticateUser );

// To close session
router.get('/users/close-session', closeSession );

// To go to restore web page
router.get('/users/restore-password', showAskRestoreForm );

// To generate token to restore password
router.post('/users/restore-password', generateTokenToRestorePassword );

// To
router.get('/users/restore-password/:token', showRestorePassword );

// To reset password
router.post('/users/restore-password/:token', resetPassword );

// To confirm email accoun 
router.get('/users/confirm-email/:email',  confirmEmail);

module.exports = router;