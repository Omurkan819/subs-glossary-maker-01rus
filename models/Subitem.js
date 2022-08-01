const mongoose = require('mongoose');

const SubitemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  subtitle: {
    type: String,
    required: true
  },
  translation: {
    type: String,
  },
  comment: {
    type: String
  },
  type: {
    type: String,
    default: 'ok'
  }
});

module.exports = mongoose.model('subitem', SubitemSchema);
