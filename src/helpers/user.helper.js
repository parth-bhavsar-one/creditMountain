let Parents = require('../models/parents.model')

class Userhelper {

    async create(body) {
        return await Parents.create({ ...body })
    }

    async update(_id, body) {
        return await Parents.findOneAndUpdate({ _id: _id },
            { ...body })
    }

    async findByEmail(email) {
        return await Parents.findOne({ email })
    }

}

module.exports = new Userhelper();