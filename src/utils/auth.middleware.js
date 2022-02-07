const jwt = require("jsonwebtoken");

class Auth {

    async createToken(_id) {
        let token = jwt.sign({ parentId: _id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 60 });
        return token
    }


    async verifyToken(req, res, next) {
        try {
            var decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            console.log("DECODED: ", decoded)
            req.payload = decoded
            next();
        } catch (error) {
            res.status(401).json({
                message: "You are not authorized to make this request."
            })
        }
    }

}

module.exports = new Auth();