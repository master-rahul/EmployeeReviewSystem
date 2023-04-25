const express = require('express');
const app = express();
const db = require('./config/mongoose');                                                // To fetch the configuration of mongoose for connecting to MongoDB database.
const bodyParser = require('body-parser');
const flash = require('connect-flash');                                                 // To fetch connect-flash module, used for send flash noticication in webpage
const customMiddleware = require('./config/middleware');                                // To fetch middleware module, used to add certains fields in response 
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const noty = require('noty');
const passportLocal = require('./config/passport_local_strategy');                      // To fetch the configuration of passport-local strategy for creating middlewares for accessing request.
const passport = require('passport');
const cookieParser = require('cookie-parser')                                           // To fetch cookie-parser module, used for parsing cookie

app.set('view engine', 'ejs');
app.set('views', './views'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());                                                                // Allows to parse cookies present in request in order to verify authentication.   
app.use(express.static('assets'));
app.use(expressSession({                                                                // Express-session created after authentication
    name: 'sample',                                                                     // Cookie Name
    secret: 'secret',                                                                    // Cooke Secret
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000 * 1000) },                                                  // Age of Cookie.
    store: MongoStore.create(                                                           // Creates a Model in MongoDb
        {
            mongoUrl: 'mongodb://localhost/EmployeeReviewSystem',                     // Database URL
            autoRemove: 'native',
            autoRemoveInterval: 30                                                      // Cookie Reomval timeperiod
        }, function (error) {
            console.log(error || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);
app.use(flash());                                                                       // Using Flash Middleware
app.use(customMiddleware.setFlash);
app.use('/', require('./route/index'));
app.listen(8000, (error)=>{
    if(error) {console.log('Error in launching Express Server'); return;}
    console.log('Express Server Launched Successfully on port : 8000');
    return;
})