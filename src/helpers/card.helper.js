let Card = require('../models/card.model')
let Child = require('../models/child.model')

class CardHelper {

    async findCard(cardNumber, childId) {
        return await Card.findOne({ cardNumber, childId })
    }

    async create(body) {
        return await Card.create({ ...body })
    }

    async findByEmail(email) {
        return await Card.findOne({ email })
    }

    async update(_id, body) {
        return await Card.findOneAndUpdate({ _id: _id }, { ...body }, { new: true })
    }

    async delete(_id) {
        return await Card.deleteOne({_id});
    }

    async aggregate(query) {
        return await Card.aggregate(query)
    }

    async findByCardId(_id) {
        return await Card.findById(_id)
    }

}

module.exports = new CardHelper();