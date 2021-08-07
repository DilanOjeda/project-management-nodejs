const express = require('express');
const path = require('path');
require('dotenv').config({ path:'./.env' });
const routes = require('./routes');
const connectToDatabase = require('./config/db');
const { vardump } = require('./helpers/helpers');

const app = express();

// Database Connection
require('./models/project');
connectToDatabase.sync()
    .then( () => console.log('Database Connection was successful.') )
    .catch( error => console.log('ERROR => ', error) );

// Setting  
    // Enable Pug package
app.set('view engine', 'pug'); 
    // Add views folder (where is pug  going to look for? )
app.set('views', path.join(__dirname, './views'));

// Middlewares 
    // Helpers    
app.use( (req, res, next ) => { 
    res.locals.vardump = vardump;   // Created a local variable that can be used in anywhere in the project (especially for front end).  
    next();
});
    // Enable to read date from form POST
app.use( express.urlencoded( { extended:true }) );
    // Load static files
app.use( express.static('public'));
    // Go to routes ( after urlencoded )
app.use( '/', routes );


// Server 

app.listen( process.env.PORT, () => {
    console.log( `It's running on port ${ process.env.PORT }` );
});