const Employee = require('../models/employee');
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
    return response.render('employeeHome');
}
module.exports.admin = async function (request, response) {
    return response.render('admin');
}