
const { User } = require('../models');


const goToSignin = async (req, res, next) => {
    
    res.render('sign-in', {
        namePage: 'Sign in a new account'
    });
}

const createUser = async (req, res, next) => {
    
    const { email, password } = req.body;
    
    try {
        await User.create({
            email,
            password
        });
        
        res.render('login');
        
    } catch (error) {
        req.flash( 'error', error.errors.map( error => error.message))
        // console.log( 'ERROR => ', error );
        res.render('sign-in', {
            namePage: 'Sign in a new account',
            messages: req.flash(),
            email,
            password
        })
    }

    
    
}

const login = (req, res, next) => {
    res.render('login', {
        namePage: 'Log in Project Management'
    });
}

module.exports = {
    goToSignin,
    createUser,
    login
}