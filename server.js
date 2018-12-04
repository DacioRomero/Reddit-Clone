// server.js
// DEPENDENCIES
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

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
    extended: true
}));
app.use(expressValidator());
app.use(cookieParser());

const checkAuth = (req, res, next) => {
    if (req.cookies.nToken == null) {
        req.user = null;
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
}

app.use(checkAuth);

// Set db
const db = require('./data/reddit-db');

// ROUTES
app.use(require('./controllers/posts'));
app.use(require('./controllers/comments'))
app.use(require('./controllers/auth'))

// LISTENER - only if directly run
if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
module.exports.stop = () => {
    return db.close()
}
