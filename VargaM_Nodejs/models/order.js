const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    tyres: [{
        _id: String,
        name: String,
        type: String,
        price: String,
        width: Number,
        height: Number,
        diameter: String
      }]
}, {collection:'Orders'});

module.exports = mongoose.model('Order', OrderSchema);
