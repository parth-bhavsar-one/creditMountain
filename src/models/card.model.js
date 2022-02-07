const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardType: {
        type: String
    },
    cardNumber: {
        type: String,
        trim: true
    },
    securityCode: {
        type: Number,
    },
    expDate: {
        type: String,
    },
    monthlyLimit: {
        type: Number,
    },
    childId: {
        type: Schema.Types.ObjectId,
        ref: "children"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("cards", CardSchema);
