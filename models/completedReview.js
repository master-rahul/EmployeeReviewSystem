const mongoose = require('mongoose');
const Employee = require('./employee');
const completedReview = new mongoose.Schema({
    feedback:{
        type : String,
        required : true,
    },
    overallPerformance : {
        type: Number,
        required: true,
    },
    improvementArea : [{
        type: String,
        required: true,
    }],
    reviewe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    reviewer :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Employee',
        required : true
    },
    reviewDate : {
        type : Date,
        default: Date.now,
        required : true
    }
}, { timestamps: true });

const CompletedReview = mongoose.model('CompletedReview', completedReview);
module.exports = CompletedReview;