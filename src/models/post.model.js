import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 160,
      index: true
    },
    body: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true
    },
    publish: {
      type: Boolean,
      default: false,
      index: true,
    }
  },
  {timestamps: true}
);

const Post = mongoose.model('posts', postSchema);

export default {Post}