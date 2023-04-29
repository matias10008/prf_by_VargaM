const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TyreSchema = new Schema({
    name: {type : String, unique: true, required: true},
    type: {type: String, required: true},
    price: {type: String, required: true},
    width: {type: String, required: true},
    height: {type: String, required: true},
    diameter: {type: String, required: true}
  }, {collection: 'Tyres'});

  module.exports = mongoose.model('Tyre', TyreSchema);