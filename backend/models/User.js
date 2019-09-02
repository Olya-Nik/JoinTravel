const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  userId: { type: ObjectId },
  name: {type: String},
  imageName: String,
  imageData: String,
  image: String,
  country: String,
  region: String,
  city: String,
  dateDepature: String,
  dateReturn: String,
  budgetPerDay: String,
  gastronomy: Boolean,
  shopping: Boolean,
  sightseeings: Boolean,
  seaChilling: Boolean,
  about: String,
  contacts: String,
  messages: []
})

const User = mongoose.model ('User', userSchema);

module.exports = { User };