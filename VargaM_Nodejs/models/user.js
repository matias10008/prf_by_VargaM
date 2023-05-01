const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    username: {type: String,required: true },
    email: {type: String,unique: true, required: true},
    password: {type: String, required: true},
}, {collection:'Users'});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      console.error('Hiba a jelszó hash-elése közben:', err);
      return next(err);
    }
  }
  if(!this.email.includes("@")){
    const error = new Error("Nem megfelelő emailcím");
    next(error);
  } else{
    next();
  }
});
    
    UserSchema.methods.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
      };

module.exports = mongoose.model('User', UserSchema);
