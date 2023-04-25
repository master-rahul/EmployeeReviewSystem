const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required: true,
    },
    employee : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
}, {timestamps : true});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;