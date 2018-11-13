const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KudosSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Title is Required"
    },
    body: {
        type: String,
        trim: true,
        required: "Body is Required"
    },
    fromUserId: 
        {
          type: Schema.Types.ObjectId,
          ref: "User"
    },
    toUserId:
        {
          type: Schema.Types.ObjectId,
          ref: "User"
    }
});

const Kudos = mongoose.model("Kudos", KudosSchema);

module.exports = Kudos;