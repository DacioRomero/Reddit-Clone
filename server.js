// server.js
// DEPENDENCIES
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

require('dotenv').config({
    path: path.join(__dirname, '.env')
});

// MIDDLEWARE
const app = express();

app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts/'),
    partialsDir: path.join(__dirname, 'views/partials/'),
    defaultLayout: 'main'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());

// Set db
require('./data/reddit-db');

// ROUTES
app.use(require('./controllers/posts'));
app.use(require('./controllers/comments'))

// LISTENER - only if directly run
if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
