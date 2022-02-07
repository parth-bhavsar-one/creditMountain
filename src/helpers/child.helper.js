let Child = require('../models/child.model')

class ChildHelper {

    async create(body) {
        return await Child.create({ ...body })
    }

    async findByEmail(email) {
        return await Child.findOne({ email })
    }

    async update(_id, body) {
        return await Child.findOneAndUpdate({ _id: _id }, { ...body }, { new: true })
    }

    async delete(filter) {
        return await Child.deleteOne(filter);
    }

    async getChildByParentId(parentId) {
        return await Child.find({parentId})
    }

}

module.exports = new ChildHelper();