const mongoose = require('mongoose');
const PendingReview = require('./pendingReview');
const CompletedReview = require('./completedReview');
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    deparment : {
        type : String,
        requried : true,
    },
    pendingReviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'PendingReviews'
    }],
    completedReviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'CompletedReview'
    }],
    admin : {
        type : Boolean,
        required : true,
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;