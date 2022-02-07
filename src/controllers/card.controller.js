var cardHelper = require('../helpers/card.helper')
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
var moment = require('moment');
const transactionHelper = require('../helpers/transaction.helper');

class Child {

    async createCard(req, res) {

        try {
            let card = await cardHelper.findCard(req.body.cardNumber, req.params.childId);

            if (card && card._id) {
                throw ({ code: 409, message: 'You have already added the same card for this child' })
            } else {
                card = await cardHelper.create({ ...req.body, childId: req.params.childId })

                console.log(card)
                res.status(200).json(card)
            }
        } catch (error) {
            console.log("ERROR: ", error)
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }

    async updateCard(req, res) {

        try {

            let card = await cardHelper.update(req.params.cardId, req.body)
            res.status(200).json(card)

        } catch (error) {
            console.log("ERROR: ", error)
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }


    async deleteCard(req, res) {

        try {

            let cardId = req.params.cardId

            await cardHelper.delete(cardId)

            res.status(200).json({
                message: "Card has been removed."
            })

        } catch (error) {
            console.log("ERROR: ", error)
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }


    async getCard(req, res) {

        try {

            let query = [
                {
                    $lookup: {
                        from: 'children',
                        localField: 'childId',
                        foreignField: '_id',
                        as: 'child'
                    }
                },
                {
                    $match: {
                        'child.parentId': ObjectId(req.payload.parentId)
                    },
                },
                {
                    $project: {
                        'child._id': 1,
                        'child.email': 1,
                        'child.name': 1,
                        _id: 1,
                        monthlyLimit: 1,
                        cardType: 1,
                    }
                }

            ];

            let cards = await cardHelper.aggregate(query);
            console.log("cards: ", cards)
            res.status(200).json({ cards });

        } catch (error) {
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }

    async charge(req, res) {

        try {

            let card = await cardHelper.findByCardId(req.body.cardId)

            console.log(card)

            if(card && card._id) {

                if (moment(card.expDate).isBefore(new Date())) {
                    res.json({
                        code: 54,
                        message: "Card has been expired."
                    })
                    return
                }

                if (Number(card.monthlyLimit) < Number(req.body.amount)) {
                    res.json({
                        code: 65,
                        message: "Monthly limit exceeded."
                    })
                    return
                }

                card = await cardHelper.update(req.body.cardId, { monthlyLimit: Number(card.monthlyLimit) - Number(req.body.amount) });

                let transaction = {
                    parentId: req.payload.parentId,
                    cardId: req.params.cardId,
                    childId: req.body.childId,
                    transactionDate: moment(new Date()).format("yyyy-MM-DD"),
                    amount: Number(req.body.amount)
                }

                await transactionHelper.create(transaction)
                res.status(200).json({ message: "SUCCESS", card });
            } else {
                throw {code: 404, message: "Card not found"}
            }


        } catch (error) {
            res.status(error.code || 500).json({
                // code: error.code || 500,
                message: error.message || "Unknown error"
            })
        }

    }


}


module.exports = new Child();