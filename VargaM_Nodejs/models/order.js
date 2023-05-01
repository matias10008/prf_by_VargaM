const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: {type: String, unique: true, required: true},
    address: {type: String, required: true},
    tyres: [{
        tyre: {
            type: Schema.Types.ObjectId,
            ref:"Tyre"
        },
        quantity: {
            type: Number,
            default : 1
        },
    },],
}, {collection:'Orders'});

module.exports = mongoose.model('Order', OrderSchema);
