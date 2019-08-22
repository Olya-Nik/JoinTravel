const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  age: Number,
  avatar: String,
  country: String,
  city: String,
  date: Date,
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