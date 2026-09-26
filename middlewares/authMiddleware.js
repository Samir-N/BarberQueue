const jwt = require("jsonwebtoken");

const middleWare = async(req,res,next) => {
    try {
        console.log('Auth middleware - Headers:', req.headers);
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                message: "No token provided",
                success: false
            });
        }
        
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(401).send({
                    message: "Unauthorized Access",
                    success: false
                });
            } else {
                // Ensure req.body exists (for methods like DELETE without a JSON body)
                if (!req.body || typeof req.body !== "object") {
                    req.body = {};
                }
                req.body.userId = decoded.userId;
                next();
            }
        });
    } catch (error) {
        return res.status(401).send({
            message: "Auth error",
            success: false
        });
    }
}

module.exports = middleWare;