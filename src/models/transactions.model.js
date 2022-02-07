const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    amount: {
        type: Number,
    },
    transactionDate: {
        type: String,
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "parents"
    },
    childId: {
        type: Schema.Types.ObjectId,
        ref: "children"
    },
    cardId: {
        type: Schema.Types.ObjectId,
        ref: "cards"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("transactions", TransactionSchema);
