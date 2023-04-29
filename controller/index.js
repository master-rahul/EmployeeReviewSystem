module.exports.login = async function(request, response) {                      // DISPLAYS THE LOGIN PAGE
    return response.render('login');
}
module.exports.register = async function (request, response) {                   // DISPLAYS THE REGISTER PAGE
    return response.render('register');
}