
const { User } = require('../models');
const sendResetPasswordEmail = require('../handlers/email');


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
        
        // Generate url to confirm email
        const urlConfirm = `http://${req.headers.host}/users/confirm-email/${email}`

        // Create object to confirm email
        await sendResetPasswordEmail({
            email,
            subject: 'Confirm Password',
            url: urlConfirm,
            file: 'confirm-email'
        });

        req.flash('correcto', 'A email has been sent, Confirm your email account')
        res.redirect('/users/login')
        
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

const showAskRestoreForm = (req, res) => {
    
    res.render('ask-restore-password', {
        namePage: 'Restore your password'
    })
}
module.exports = {
    goToSignin,
    createUser,
    login,
    closeSession,
    showAskRestoreForm
}