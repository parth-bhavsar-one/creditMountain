var childHelper = require('../helpers/child.helper')
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId

class Child {

    async createChild(req, res) {

        try {
            let child = await childHelper.findByEmail(req.body.email)

            if (child && child._id) {
                throw ({ code: 409, message: 'A child with entered email id is already added!' })
            } else {
                child = await childHelper.create({ ...req.body, parentId: req.payload.parentId })
                res.status(200).json(child)
            }
        } catch (error) {
            console.log("ERROR: ", error)
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }

    async updateChild(req, res) {

        try {

            let child = await childHelper.findByEmail(req.body.email)

            if (child && child._id && String(child._id) != String(req.params.childId)) {
                throw ({ code: 409, message: 'A child with entered email id is already added!' })
            } else {
                child = await childHelper.update(req.params.childId, req.body)
                res.status(200).json(child)
            }

        } catch (error) {
            console.log("ERROR: ", error)
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }


    async deleteChild(req, res) {

        try {

            let childId = req.params.childId

            await childHelper.delete({ parentId: req.payload.parentId, _id: ObjectId(childId) })

            res.status(200).json({
                message: "Child has been removed."
            })

        } catch (error) {
            console.log("ERROR: ", error)
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }


    async getChild(req, res) {

        try {

            let childs = await childHelper.getChildByParentId(req.payload.parentId);
            res.status(200).json({
                childs
            })

        } catch (error) {
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }


}


module.exports = new Child();