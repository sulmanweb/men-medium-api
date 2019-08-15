import postModel from '../models/post.model'
import userModel from '../models/user.model'
import postView from '../views/post.view'
import {errorRes} from "../lib/errorResponse";

const index = async (req, res) => {
  try {
    const posts = await postModel.Post.find({publish: true}).populate('createdBy');
    res.status(200).json(postView.index(posts));
  } catch (e) {
    errorRes(res, 400, e.message);
  }
};

const create = async (req, res) => {
  try {
    var post = await postModel.Post.create({...req.body, createdBy: req.currentUser._id});
    post = await postModel.Post.findById(post._id).populate('createdBy');
    res.status(201).json(postView._post(post));
  } catch (e) {
    console.error(e);
    errorRes(res, 400, e.message);
  }
};

const update = async (req, res) => {
  try {
    const post = await postModel.Post.findById(req.params.id).populate('createdBy');
    if (!post || post.createdBy._id.toString() !== req.currentUser._id.toString()) {
      errorRes(res, 404)
    }
    const _postTmp = {
      title: req.body.title ? req.body.title : post.title,
      body: req.body.body ? req.body.body : post.body
    };
    await postModel.Post.update({_id: req.params.id}, _postTmp, async function (err, post) {
      if (err) {
        res.send(err);
      }
      let finalPost = await postModel.Post.findById(req.params.id).populate('createdBy');
      res.status(200).json(postView._post(finalPost));
    });
  } catch (e) {
    console.error(e);
    errorRes(res, 400, e.message);
  }
};

const show = async (req, res) => {
  try {
    const post = await postModel.Post.findById(req.params.id).populate('createdBy');
    if (!post) {
      errorRes(res, 404)
    }
    res.status(200).json(postView._post(post));
  } catch (e) {
    console.error(e);
    errorRes(res, 400, e.message);
  }
};

const destroy = async (req, res) => {
  try {
    const post = await postModel.Post.findByIdAndDelete(req.params.id);
    res.status(204).end()
  } catch (e) {
    console.error(e);
    errorRes(res, 400, e.message);
  }
};

const myPosts = async (req, res) => {
  try {
    const posts = await postModel.Post.find({createdBy: req.currentUser._id}).populate('createdBy');
    res.status(200).json(postView.index(posts));
  } catch (e) {
    errorRes(res, 400, e.message);
  }
};

export default {index, create, update, show, destroy, myPosts}