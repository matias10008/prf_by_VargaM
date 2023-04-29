const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    email: {type: String,unique: true, required: true},
    name: {type: String,required: true },
    password: {type: String, required: true},
    address: {type: String, required: true}
}, {collection:'Users'});

UserSchema.pre("save", function (next) {
    var user = this;
  
    if (!user.isModified("password")) return next();
  
    bcrypt.hash(user.password, null, null, function (err, hash) {
      if (err) return next(err);
  
      user.password = hash;
      next();
    });
  });
    
    UserSchema.methods.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
      };

module.exports = mongoose.model('User', UserSchema);
