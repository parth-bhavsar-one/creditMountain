var userHelper = require('../helpers/user.helper');
var authHelper = require('../utils/auth.middleware')

class Users {

    async createParent(req, res) {
        try {
            let parent = await userHelper.findByEmail(req.body.email)
            if (parent && parent._id) {
                throw ({ code: 409, message: 'Entered email id is already registered!' })
            } else {
                parent = await userHelper.create(req.body)
                res.status(200).json(parent)
            }
        } catch (error) {
            console.log("ERROR: ", error)
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }
    }

    async login(req, res) {
        try {
            let parent = await userHelper.findByEmail(req.body.email)

            if (parent && parent._id) {
                let token = await authHelper.createToken(parent._id)
                res.status(200).json({ token })
            } else {
                throw ({ code: 401, message: 'Incorrect email!' })
            }
        } catch (error) {
            console.log("ERROR: ", error)
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }
    }
}


module.exports = new Users();