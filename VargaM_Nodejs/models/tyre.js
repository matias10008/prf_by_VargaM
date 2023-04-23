const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TyreSchema = new Schema({
    name: String,
    type: String,
    price: Number,
    width: Number,
    height: Number,
    diameter: String

  });

  module.exports = mongoose.model("Tyre", TyreSchema);