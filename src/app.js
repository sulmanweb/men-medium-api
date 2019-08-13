import express from 'express'
import {json, urlencoded} from 'body-parser'
import path from 'path'
import logger from 'morgan'
import cors from 'cors'

import {connectDb} from "./config/database";
import config from './config'

import indexRouter from './routes/index'

const app = express();

/*
const whitelist = ['http://google.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};
*/

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use('/api', indexRouter);

export const start = async () => {
  try {
    await connectDb();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
};

