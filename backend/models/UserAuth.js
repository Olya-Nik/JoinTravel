const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userAuthSchema = new mongoose.Schema({
  username: String,
  password: String,
  provider: String,
  providerId: String
});

const UserAuth = mongoose.model('UserAuth', userAuthSchema);

userAuthSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

userAuthSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = { UserAuth }; 
