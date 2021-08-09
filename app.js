require('dotenv').config({ path:'./.env' });
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const passport = require('./config/passport');

const connectToDatabase = require('./config/db');
const { vardump } = require('./helpers/helpers');

const app = express();

// Database Connection
require('./models/project');
require('./models/task');
require('./models/user');

connectToDatabase.sync()
    .then( () => console.log('Database Connection was successful.') )
    .catch( error => console.log('ERROR => ', error) );

// Setting  
    // Enable Pug package
app.set('view engine', 'pug'); 

    // Add views folder (where is pug  going to look for? )
app.set('views', path.join(__dirname, './views'));

// Middlewares 

// Cookie parser
app.use( cookieParser() );

// Session allows users to surf different web pages without authenticate again. 
app.use(session({
    secret: 'superSecret',
    resave: false,
    saveUninitialized: false
}));

app.use( passport.initialize() );
app.use( passport.session() );

// flash for message 
app.use( flash() );

    // Helpers  
app.use( (req, res, next ) => { 

    // console.log('USER => ', req.user)    
    res.locals.vardump = vardump;   // Created a local variable that can be used in anywhere in the project (especially for front end).  
    res.locals.messages = req.flash();
    res.locals.user = { ...req.user } || null;
    next();
});
    // Enable to read date from form POST
app.use( express.urlencoded( { extended:true }) );

    // Load static files
app.use( express.static('public'));

    // Go to routes ( after urlencoded )
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
app.use( '/', projectRoutes );
app.use( '/', taskRoutes );
app.use( '/', userRoutes );

// Server 
app.listen( process.env.PORT, () => {
    console.log( `It's running on port ${ process.env.PORT }` );
});