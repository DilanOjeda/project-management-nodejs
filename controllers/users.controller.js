
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
        
        res.render('login',{
            namePage: 'Log in to Project Management'
        });
        
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

const login = (req, res) => {
    
    const { error } = res.locals.messages;
    // console.log( res.locals.messages )
    
    res.render('login', {
        namePage: 'Log in Project Management',
        errors: error
    });
}

const closeSession = (req, res) => {
    req.session.destroy( () => {
        res.redirect('/users/login');
    })
}
module.exports = {
    goToSignin,
    createUser,
    login,
    closeSession
}