const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "parents"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Child", ChildSchema);
