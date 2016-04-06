var path    = require("path");

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('educio.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/home', isLoggedIn, function(req, res) {
        console.log("teacher in req: ");
        console.log(req.user);
        res.render('home.ejs', {
            teacher : req.user // get the teacher out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

/**
 * Route middleware to make sure a teacher is logged in
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

/**
 * Returns a file path under the ../views/ directory
 */
function viewDirFilePath(fileName) {
    return path.join(__dirname + pathToViewsDir + fileName);
}