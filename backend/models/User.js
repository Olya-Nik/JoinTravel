const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  userId: { type: ObjectId },
  age: Number,
  avatar: String,
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