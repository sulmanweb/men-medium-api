import mongoose from 'mongoose'
import {randomGen} from '../lib/randomGen'

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      maxLength: 16,
      unique: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true
    },
    status: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {timestamps: true}
);

sessionSchema.pre('validate', function (next) {
  if (!this.isNew) {
    next();
  }
  var newToken;
  do {
    newToken = randomGen(16)
  }
  while (!Session.findOne({token: newToken}));
  this.token = newToken;
  next();
});

const Session = mongoose.model('sessions', sessionSchema);

export default {Session}