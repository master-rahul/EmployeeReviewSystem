const cookieParser = require('cookie-parser')       // Fetch cookie-parser modules  .
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');
const MongoStore = require('connect-mongo');        // Fetch connect-mongo modules.
const cookie = require('cookie');

passport.use(new LocalStrategy({
    usernameField: 'email', // needs to match with field having property unique in UserSchema.
    passReqToCallback: true // allows us to set the first arguments as request
},
    async function (request, email, password, done) {
        // find the user and estaablish the identity
        const employee = await Employee.findOne({ email: email });
        if (!employee || employee.password != password) {
            request.flash('error', 'Error Username/Password');
            return done(null, false);
        }
        else {
            return done(null, employee); 
        }  
    }
));

passport.serializeUser(function (employee, done) {
    console.log('serialize');
    done(null, employee._id);
});


passport.deserializeUser(async function (id, done) {
    try {
        const employee = await Employee.findById(id).select('-password');
        if (!employee) {
            return done(null, false);
        }
        // Modify the employee object to add the `employee` property:
        employee.employee = true;
        return done(null, employee);
    } catch (error) {
        return done(error);
    }
});

passport.checkAuthentication = function (request, response, next) {
    if (request.isAuthenticated()) return next();
    return response.redirect('/');
}

passport.setAuthenticated = function (request, response, next) {
    console.log("Req", request.user);
    if (request.isAuthenticated()) {
        response.locals.name = request.user.name;
        response.locals.userId = request.user.id;
        response.locals.email = request.user.email;
        response.locals.admin = request.user.admin;
    }
    return next();
}


passport.redirectAuthenticated = function (request, response, next) {
    if (request.isAuthenticated()) return response.redirect('/profile');
    return next();
}

module.exports = passport;