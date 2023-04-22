const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.send({success: false, message: "No token found!"});
        return;
    }
    let token = authHeader.split(' ')[1];
    var z = null;
    try{
        z = jwt.verify(token, process.env.TOKEN_SECRET)
    }
    catch (err){
        res.send({success: false, message: err.message});
        return;
    }
    console.log(z);
    req.userId = z.userId;
    next();
}
exports.jwtMiddleware = jwtMiddleware;