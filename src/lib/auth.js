import config from '../config'
import sessionModel from '../models/session.model'
import userModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import {errorRes} from '../lib/errorResponse'

export const newToken = async (user) => {
  const session = await sessionModel.Session.create({user: user});
  return jwt.sign({id: user._id, token: session.token}, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
};

export const authenticateUser = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, config.secrets.jwt, async (err, decoded) => {
      if (err) {
        //TODO set the res
        return errorRes(res, 401);
      } else {
        try {
          const session = await sessionModel.Session.findOne({token: decoded.token, status: true});
          const user = await userModel.User.findById(session.user);
          if (session) {
            req.authToken = session.token;
            req.currentUser = user;
            next();
          } else {
            return errorRes(res, 401);
          }
        } catch (e) {
          errorRes(res, 400, e.message)
        }
      }
    });
  } else {
    return errorRes(res, 401);
  }
};

export const getCurrentUser = (req, res, next) => {
  let token = req.headers['Authorization'];
  req.currentUser = null;
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, config.secrets.jwt, async (err, decoded) => {
      if (err) {
        next();
      } else {
        try {
          const session = await sessionModel.Session.findOne({token: decoded.token, status: true});
          const user = await userModel.User.findById(session.user);
          if (session) {
            req.authToken = session.token;
            req.currentUser = user;
            next();
          } else {
            next();
          }
        } catch (e) {
          next();
        }
      }
    });
  } else {
    next();
  }
};