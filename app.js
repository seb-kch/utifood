const express       = require('express');
const favicon       = require('serve-favicon');
const path          = require('path');
const app           = express();
const port          = 80;
const mongoose      = require('mongoose');
const passport      = require ('passport');
const flash         = require('connect-flash');

const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const session       = require('express-session');

var configDB = require(path.join(__dirname, 'config/database.js'));

// config
mongoose.connect(configDB.url); // connect to Database


// Routers
var user = require(path.join(__dirname, '/routes/user/user.js'))


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// for passport
app.use(session({ secret: 'utifoodcookiesecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, '/public')));
app.engine('.html', require('ejs').__express);
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// Routing
app.use('/user', user);

// Index site
app.get('/', (req, res) => {
    res.render('index');
});
// Server is running
app.listen(port, () => {
    console.log(`UtiFood-Server is running at http://localhost:${port}`);
});