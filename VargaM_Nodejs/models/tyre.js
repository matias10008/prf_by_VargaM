const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TyreSchema = new Schema({
    name: {type : String, unique: true, required: true},
    type: {type: String, required: true},
    price: {type: String, required: true},
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    diameter: {type: String, required: true}
  }, {collection: 'Tyres'});

  TyreSchema.pre('save',async function (next){
    if(this.name == "" || this.type == "" || this.price == "" || this.width < 50 || this.height < 30 || this.diameter == ""){
      const error = new Error("Error while saving to database, some value is not correct");
      next(error);
    } else{
      next();
    }
  });

  module.exports = mongoose.model('Tyre', TyreSchema);