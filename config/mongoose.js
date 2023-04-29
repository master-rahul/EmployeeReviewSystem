const mongoose = require('mongoose');                                                       // To fetch mongoose module
mongoose.connect('mongodb://localhost/EmployeeReviewSystem');                               // Connecting to Database
const db = mongoose.connection;                                                             // Getting the connection instance
db.on('error',console.error.bind(console, "Error in Connecting Database"));                 // Checking for connection error
db.once('open', () => {console.log('Successfully Connected to Database')});                 // Database Connecitonn Successful.
module.exports = db;                                                                        // Exporting our database instance