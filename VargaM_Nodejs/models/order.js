const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const OrderSchema = new Schema({
    name: String,
    address: String,
    tyres: [{
        tyre: {
            type: Schema.Types.ObjectId,
            ref:"Tyres"
        },
        quantity: {
            type: Number,
            default : 1
        },
    },],
});

module.exports = mongoose.model("Order", OrderSchema);
