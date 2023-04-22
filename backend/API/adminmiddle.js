const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next){
    if (!req.admin || req.admin == false) {
        res.send({success: false, message: "Admin Only Access!"});
        return;
    }
    next();
}

exports.adminMiddleware = adminMiddleware;