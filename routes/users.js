const { Router } = require('express');
const router = Router();

const { goToSignin, createUser, login } = require('../controllers/users.controller')

// To go to sign in web page
router.get( '/users/sign-in', goToSignin );

// To create a new user
router.post( '/users/create-user', createUser)

// To go to log in web page and also to log in to Project Management
router.get( '/users/login', login)

module.exports = router;