let Transaction = require('../models/transactions.model')

class Transactionhelper {

    async create(body) {
        return await Transaction.create({ ...body })
    }

}

module.exports = new Transactionhelper();