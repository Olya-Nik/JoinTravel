const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  userId: { type: ObjectId },
  name: String,
  age: Number,
  imageName: String,
  imageData: String,
  image: String,
  country: String,
  city: String,
  dateDepature: Date,
  dateReturn: Date,
  budgetPerDay: Number,
  gastronomy: Boolean,
  shopping: Boolean,
  sightseeings: Boolean,
  seaChilling: Boolean,
  about: String,
  contacts: String,
  message: String
})

const User = mongoose.model ('User', userSchema);

module.exports = { User };