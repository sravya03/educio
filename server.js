var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
mongoose.set('debug', true);

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname + '/app-client/views');

// required for passport
app.use(session({ 
	resave: false,
	secret: 'educioisawesome',
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Store all html files in views folder
app.use(express.static(__dirname + '/app-client/views'));
app.use(express.static(__dirname + '/app-client/views/partials'));
app.use(express.static(__dirname + '/config'));

// routes ======================================================================
require('./app-server/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);