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
        req.user.getClasses(function(err, classes) {
            if (err) {
                return;
            }
            res.render('home.ejs', {
                teacher : req.user,
                classes : classes,
                message : req.flash('classAccessPermission')
            })
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/class/:id', isLoggedIn, function(req, res, next) {
        // Class.findOne({ 'teacher' : req.user._id, '_id' : req.params.id }, function(err, classObj) {
        //     if (classObj) {
        //         res.render('class_view', {
        //             classObj: classObj
        //         });
        //     } else {
        //         req.flash('classAccessPermission', 'Sorry, you do not teach this class.');
        //         res.redirect('/home');
        //     }
        // });
        res.render('class_view.ejs', {
            teacher : req.user,
            classObj: mockClassDataObj
        });
    });

    app.get('/newclass', function(req, res) {
        res.render('new_class.ejs', {message: req.flash('newClassMessage') });
    });

    app.post('/newclass', function(req, res) {
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

    app.get('/att_and_gradebook', function(req, res) {
        res.render('attendance_and_gradebook.ejs');
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