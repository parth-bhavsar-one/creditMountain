const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParentsSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true
    },
},
    { timestamps: true }
);

// mongoose.model("Parents", ParentsSchema);

module.exports = mongoose.model("Parents", ParentsSchema);
