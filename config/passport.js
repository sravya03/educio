var LocalStrategy   = require('passport-local').Strategy;

var Teacher         = require('../app-server/models/teacher');

module.exports = function(passport) {

    passport.serializeUser(function(teacher, done) {
        done(null, teacher.id);
    });

    passport.deserializeUser(function(id, done) {
        Teacher.findById(id).populate('classes').exec(function(err, teacher) {
            done(err, teacher);
        });
    });

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a teacher whose email is the same as the forms email
        Teacher.findOne({ 'local.email' :  email }).populate('classes').exec(function(err, teacher) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a teacher with that email
            if (teacher) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no teacher with that email
                // create the teacher
                var newTeacher            = new Teacher();

                // set the teacher's local credentials
                newTeacher.local.email    = email;
                newTeacher.local.password = newTeacher.generateHash(password);

                // save the teacher
                newTeacher.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newTeacher);
                });
            }

        });    

        });

    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // find a teacher whose email is the same as the forms email
        // we are checking to see if the teacher trying to login already exists
        Teacher.findOne({ 'local.email' :  email }).populate('classes').exec(function(err, teacher) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no teacher is found, return the message
            if (!teacher || !teacher.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'No user found with these credentials.'));

            // all is well, return successful teacher
            return done(null, teacher);
        });
    }));

};