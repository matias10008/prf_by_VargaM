const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    username: {type: String,required: true },
    email: {type: String,unique: true, required: true},
    password: {type: String, required: true},
}, {collection:'Users'});

UserSchema.pre('save', async function(next) {
  // Csak akkor hash-eljük a jelszót, ha az valóban módosult (új jelszó vagy módosítás)
  if (this.isModified('password')) {
    try {
      // Generáljunk egy sót (salt) a jelszó hash-eléséhez
      const salt = await bcrypt.genSalt(10);
      
      // Hash-eljük a jelszót a sóval
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      console.error('Hiba a jelszó hash-elése közben:', err);
      return next(err);
    }
  }
  next();
});
    
    UserSchema.methods.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
      };

module.exports = mongoose.model('User', UserSchema);
