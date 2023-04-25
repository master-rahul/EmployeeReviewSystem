module.exports.login = async function(request, response) {
    return response.render('login');
}
module.exports.register = async function (request, response) {
    return response.render('register');
}