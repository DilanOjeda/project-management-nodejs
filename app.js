const express = require('express');
const path = require('path');
require('dotenv').config({ path:'./.env' });

const app = express();

const routes = require('./routes');



// Setting  
    // Enable Pug package
app.set('view engine', 'pug'); 
    // Add views folder (where is pug  going to look for? )
app.set('views', path.join(__dirname, './views'));

// Middlewares 
    
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