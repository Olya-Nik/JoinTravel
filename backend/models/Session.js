const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  lastAccess: { type: Date, default: Date.now },
  _sessionid: String,
  // cookie: {}
});

SessionSchema.index({ lastAccess: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

const SessionSchema = mongoose.model('UserAuth', userAuthSchema);

module.exports = { SessionSchema };
