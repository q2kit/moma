const loginRequired = require('./login_required');

const adminRequired = (req, res, next) => {
    if (req.user && req.user.is_admin) {
        next();
    } else {
        res.status(403).send('Admin required');
    }
}

module.exports = adminRequired;