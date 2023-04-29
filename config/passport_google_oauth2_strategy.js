const passport = require('passport');                                                                   // Fetching passport module
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;                                 // Fetching passport google strategy
const crypto = require('crypto');                                                                       // Fetchng crypto for password generation
const User = require('../models/employee');                                                             // Fetching the Employee model

// tell passport to use a new strategy for google login
passport.use(new GoogleStrategy({                   
        clientID: process.env.SOCIALMEDIAAPP_GOOGLE_CLIENT_ID,                                          // Setting Web Client ID
        clientSecret: process.env.SOCIALMEDIAAPP_GOOGLE_CLIENT_SECRET,                                  // Setting Web Client Secret
        callbackURL: 'http://localhost:8000/employee/auth/google/callback',                             // Setting redirect URL
    },
    async function (accessToken, refreshToken, profile, callback) {                                       
        module.exports.token = accessToken;
        console.log("Access Token :", accessToken, " :: Refresh Token : ", refreshToken);
          const user = await User.findOne({email : profile.emails[0].value}).select('-password');
       try{
           if (user) {                                                              // if found, set this user as request.user
               return callback(null, user);
           } else {
               // if not found, create and set it as request.user
               const user1 = await User.create({
                   name: profile.displayName,
                   email: profile.emails[0].value,
                   password: crypto.randomBytes(20).toString('hex'),
                   admin: false,
                   deparment: 'Administration'
               });

               console.log("Error in Google Strategy");
               return callback(null, user1);
           } 
        }catch(error){
            console.log(error);
           return callback(null, false);
           }
    }
));

module.exports = passport;

