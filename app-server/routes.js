var path    = require("path");
var mockClassDataObj = require("./mock_data/mockClassDataObj");
var Class   = require("./models/class");
var Teacher = require("./models/teacher");

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.redirect('/login');
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
        res.render('home.ejs', {
            teacher : req.user
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/class/:id', isLoggedIn, function(req, res, next) {
        res.render('class_view.ejs', {
            teacher : req.user,
            classObj: mockClassDataObj
        });
    });

    app.get('/class/:id/agenda/:month/:day/:year', isLoggedIn, function(req, res) {
        res.render('class_agenda_notes.ejs', {
            teacher : req.user,
            month : req.params.month,
            day : req.params.day,
            year : req.params.year
        });
    });

    app.get('/newclass', isLoggedIn, function(req, res) {
        res.render('new_class.ejs', {
            teacher : req.user
        });
    });

    app.post('/newclass', isLoggedIn, function(req, res) {
        var newClass = new Class();
        newClass.name = req.body.className;
        newClass.teacher = req.user._id;
        newClass.save(function(err) {
            if (err)
                req.flash('newClassMessage', 'Unable to add your new class at this time.');
            else {
                res.redirect('/home');
            }
        });
    });

    app.get('/class/:id/attendance_and_gradebook', isLoggedIn, function(req, res) {
        res.render('attendance_and_gradebook.ejs', {
            teacher : req.user
        });
    });


    app.get('/class/:id/class_information', isLoggedIn, function(req, res) {
        res.render('class_information.ejs', {
            teacher : req.user
        });
    });

    app.get('/class/:id/agenda', isLoggedIn, function(req, res) {
        res.render('agenda.ejs', {
            teacher : req.user
        });
    });

    app.get('/bootstrap-calendar/tmpls/:fileName', isLoggedIn, function(req, res) {
        res.render('/bootstrap-calendar/tmpls/' + req.fileName);
    })

    app.get('/class/:id/assignments', isLoggedIn, function(req, res) {
        res.render('assignments.ejs', {
            teacher : req.user
        });
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