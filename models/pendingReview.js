const mongoose = require('mongoose');
const Employee = require('./employee');
const pendingReview = new mongoose.Schema({
    instruction:{
        type : String,
    },
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
    endDate : {
        type : Date,
        default: Date.now,
        required : true
    }
}, { timestamps: true });

const PendingReview = mongoose.model('PendingReview', pendingReview);
module.exports = PendingReview;