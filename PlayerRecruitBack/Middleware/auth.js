const jsonwebtoken = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return res.status(403).send({ "error": "A token is required for authentication" });
    }
    try {
        const tok = token.split(' ');
        const decoded = jsonwebtoken.verify(tok[1], process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ "error": "Invalid Token" });
    }
    return next();
}