const express = require('express');                                                     // To fetch express module
const app = express();                                                                  // Intializing express 
const passport = require('passport');                                                   // To fetch passport module
const MongoStore = require('connect-mongo');                                            // To fetch mongo-connect module fo storing session key
const db = require('./config/mongoose');                                                // To fetch the configuration of mongoose for connecting to MongoDB database.
const bodyParser = require('body-parser');                                              // For deconding the request.body
const flash = require('connect-flash');                                                 // To fetch connect-flash module, used for send flash noticication in webpage
const customMiddleware = require('./config/middleware');                                // To fetch middleware module, used to add certains fields in response 
const expressSession = require('express-session');                                      // To fetch the express-session
const noty = require('noty');                                                           // To get noty for custom flash messages
const passportLocal = require('./config/passport_local_strategy');                      // To fetch the configuration of passport-local strategy for creating middlewares for accessing request.
const cookieParser = require('cookie-parser')                                           // To fetch cookie-parser module, used for parsing cookie
const passportGoogle = require('./config/passport_google_oauth2_strategy');             // To fetch the configuration of passport-oauth2 stragtegy for creating middleware for accessing request.

app.set('view engine', 'ejs');                                                          // Setting our view engine
app.set('views', './views');                                                            // Setting view path

app.use(bodyParser.urlencoded({ extended: false }));                                    // Adding middleware to decode request.body
app.use(cookieParser());                                                                // Allows to parse cookies present in request in order to verify authentication.   
app.use(express.static('assets'));                                                      // Allowing static files accessile
app.use(expressSession({                                                                // Express-session created after authentication
    name: 'sample',                                                                     // Cookie Name
    secret: 'secret',                                                                   // Cooke Secret
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000 * 1000) },                                                  // Age of Cookie.
    store: MongoStore.create(                                                           // Creates a Model in MongoDb
        {
            mongoUrl: 'mongodb://localhost/EmployeeReviewSystem',                       // Database URL
            autoRemove: 'native',
            autoRemoveInterval: 30                                                      // Cookie Reomval timeperiod
        }, function (error) {
            console.log(error || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());                                                         // Adding passport middleware
app.use(passport.session());                                                            // Adding passport middleware
app.use(passport.setAuthenticated);                                                     // Custome middleware to add user information in request
app.use(flash());                                                                       // Using Flash Middleware
app.use(customMiddleware.setFlash);                                                     // For sending flash messages
app.use('/', require('./route/index'));
app.listen(8000, (error)=>{                                                             // Express Sever listening to port 8000 at localhost
    if(error) {console.log('Error in launching Express Server'); return;}
    console.log('Express Server Launched Successfully on port : 8000');
    return;
})