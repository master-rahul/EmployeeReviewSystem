const Employee = require('../models/employee');
const PendingReview = require('../models/pendingReview');
const CompletedReview = require('../models/completedReview');

module.exports.add = async function (request, response) {
    if (request.body.password != request.body.confirm_password){
        request.flash('error', 'Password does not match');
        return response.redirect('back');
    } 
    try {
        let employee = await Employee.findOne({ email: request.body.email });
        if (employee) {
            request.flash('error', 'User Already Exists');
            return response.redirect('back');
        }
        else {
            console.log('User Added Successfully');
            await Employee.create({ name: request.body.name, email: request.body.email, password: request.body.password, admin : false });
            request.flash('success', 'Used Added Successfuly');
            return response.redirect('/');
        }
    } catch (error) {
        request.flash('error', 'User not Added');
        return response.staus('500').send();
    }   
}

module.exports.createSession = async function (request, response) {
    const employee = await Employee.findOne({email : request.body.email});
    console.log('Session Created');
    if(employee.admin){
        request.flash('success', 'Logged In Successfully');
        return response.redirect('/admin/home');
    }else{
        request.flash('success', 'Logged In Successfully');
        return response.redirect('/employee/home');
    }
}

module.exports.destroySession = async function(request, response){
    request.logout(function (error) {
        if (error) { return response.status('500').send(); }
        else {
            request.flash('success', 'Logged Out Successfully');
            return response.redirect('/');
        }
    });
}

module.exports.home = async function(request, response){
    const pendingReview = await PendingReview.find({ 'reviewer': request.user.id}).populate({path : 'reviewer reviewe', select : '-password'});
    const completedReview = await CompletedReview.find({'reviewer' : request.user.id}).populate({path : 'reviewer reviewe', select : 'name'});
    return response.render('employeeHome', {pendingReviewList : pendingReview, completedReviewList : completedReview});
}
module.exports.admin = async function (request, response) {
    const pendingReview = await PendingReview.find().populate({path : 'reviewer reviewe', select : 'name'});
    const completedReview = await CompletedReview.find().populate({ path: 'reviewer reviewe', select: 'name' });
    return response.render('admin', {pendingReviewList : pendingReview, completedReviewList : completedReview});
}
module.exports.employeeView = async function (request, response) {
    const employee = await Employee.find().select('-password');
    return response.render('employeeView', { employeeList: employee });
}

module.exports.remove = async function (request, response) {
    const employee = await Employee.findByIdAndDelete(request.params.id);
    return response.redirect('back');
}
module.exports.setAdmin = async function (request, response) {
    const employee = await Employee.findById(request.params.id);
    employee.admin = true;
    employee.save();
    return response.redirect('back');
}
module.exports.addReview = async function (request, response) {
    console.log(request.body);
    const pendingReview = await PendingReview.findById(request.body.pendingId);
    if (pendingReview) {
        const completedReview = await CompletedReview.create({
            feedback: request.body.reviewComments,
            overallPerformance: request.body.overallPerformance,
            improvementArea: request.body.improvementArea.split(","),
            reviewe : pendingReview.reviewe,
            reviewer : pendingReview.reviewer,
            reviewDate : new Date()
        });
        const employee = await Employee.findByIdAndUpdate(pendingReview.reviewer, {$push : {completedReviews : completedReview}, $pull : {pendingReviews : pendingReview.id}});
        await PendingReview.findByIdAndDelete(request.body.pendingId);
    }
   
    
    return response.redirect('back');
}

module.exports.employeeReview = async function (request, response) {
    try {
        const newPendingReview = new PendingReview({
            instruction: "Review the report",
            reviewe: "6449316d40c6c069a8ea4752", // Replace with an actual employee ID
            reviewer: "6449316d40c6c069a8ea4752", // Replace with an actual employee ID
            endDate: new Date()
        });
        const savedPendingReview = await newPendingReview.save();
        console.log('New pendingReview created:', savedPendingReview);
    } catch (error) {
        console.error('Error creating pendingReview:', error);
    }
    const pendingReview = await PendingReview.find().populate({path : 'reviewer reviewe' , select :'name'});
    const employee = await Employee.find().select('-password');
    return response.render('employeeReview', {pendingReviewList : pendingReview, employeeList : employee});
}