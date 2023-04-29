module.exports.setFlash = function (request, response, next) {                          // Middleware to check any flash messgae to show in frontend
    response.locals.flash = {
        'success': request.flash('success'),
        'error': request.flash('error')
    }
    next();
}