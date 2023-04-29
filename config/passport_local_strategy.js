const cookieParser = require('cookie-parser')                                   // Fetch cookie-parser modules  .
const passport = require('passport');                                           // Fetching passport module
const LocalStrategy = require('passport-local').Strategy;                       // Fetching passport local strategy
const Employee = require('../models/employee');                                 // Fetching employee model
const MongoStore = require('connect-mongo');                                    // Fetch connect-mongo modules.
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

passport.serializeUser(function (employee, done) {                                          // serilazies using the employee id
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

passport.checkAuthentication = function (request, response, next) {                             //Verfies authenticeation
    if (request.isAuthenticated()) return next();   
    return response.redirect('/');
}

passport.setAuthenticated = function (request, response, next) {                                // Sets the user information in request.
    if (request.isAuthenticated()) {    
        response.locals.name = request.user.name;
        response.locals.userId = request.user.id;
        response.locals.email = request.user.email;
        response.locals.admin = request.user.admin;
    }
    return next();
}
passport.checkAdmin = async function (request, response, next) {                                //Verfies authentication for admins
    if (request.isAuthenticated()) {
       const emp = await Employee.findById(request.user.id);
        if (emp.admin) return next();
        else return response.redirect('/employee/home');
    }
    return  response.redirect('/');
}
passport.checkEmployee = async function (request, response, next) {                             //Verfies authentication for employee
    if (request.isAuthenticated()) {
        const emp = await Employee.findById(request.user.id);
        if (!emp.admin) return next();
        else return response.redirect('/employee/home');
    }
    return response.redirect('/');
}


module.exports = passport;