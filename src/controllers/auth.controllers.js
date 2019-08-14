import userModel from '../models/user.model'
import sessionModel from '../models/session.model'
import userView from '../views/user.view'
import {errorRes} from "../lib/errorResponse.js";
import {newToken} from '../lib/auth'

const signUp = async (req, res) => {
  try {
    const user = await userModel.User.create(req.body);
    if (user) {
      try {
        const token = await newToken(user);
        res.status(201).json(userView.auth(user, token))
      } catch (e) {
        errorRes(res, 400, e.message);
      }
    }
    errorRes(res, 422);
  } catch (e) {
    console.error(e);
    errorRes(res, 400, e.message);
  }
};

const signIn = async (req, res) => {
  try {
    const user = await userModel.User.findOne({email: req.body.email})
    if (user) {
      try {
        try {
          await user.checkPassword(req.body.password)
          const token = await newToken(user);
          res.status(200).json(userView.auth(user, token))
        } catch (e) {
          errorRes(res, 400, e.message);
        }
      } catch (e) {
        console.error(e);
        errorRes(res, 401, e.message);
      }
    }
  } catch (e) {
    console.error(e);
    errorRes(res, 400, e.message);
  }
};

const signOut = async (req, res) => {
  try {
    await sessionModel.Session.findOneAndUpdate({
      token: req.authToken,
      status: true
    }, {status: false}, {new: true}).lean().exec();
    res.status(204).end();
  } catch (e) {
    console.error(e);
    errorRes(res, 400, e.message);
  }
};

export default {signUp, signIn, signOut}