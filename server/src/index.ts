import express from 'express';
import cors from 'cors';
import * as bodyparser from 'body-parser';
import {requestLoggerMiddleware} from './request.logger.middleware';
import cookieParser from 'cookie-parser';
import expressSessions from 'express-session';
import passport from 'passport';

const post=require('./routes/post');
const user=require('./routes/user');


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}));
app.use(
    expressSessions({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
 app.use(requestLoggerMiddleware);
 app.use(cookieParser("secret code"));
 require('./passport.config')(passport);
 app.use(passport.initialize());
 app.use(passport.session());
 
 //routes
 app.use(post);
 app.use(user);






export { app }