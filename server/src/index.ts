import express from 'express';
import cors from 'cors';
import * as bodyparser from 'body-parser';
import {requestLoggerMiddleware} from './request.logger.middleware';
import cookieParser from 'cookie-parser';
import expressSessions from 'express-session';
import passport from 'passport';
const fileUpload = require('express-fileupload');
const post=require('./routes/post');
const user=require('./routes/user');
const key=require('./routes/keyGen');
const amiami=require('./routes/amiami');
const project=require('./routes/project');
const testRoutes=require('./routes/testRoutes');
const serverRoutes=require('./routes/server');
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
  app.use(fileUpload({
    createParentPath: true
}));


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
 app.use(requestLoggerMiddleware);
 app.use(cookieParser("secret code"));
 require('./passport.config')(passport);
 app.use(passport.initialize());
 app.use(passport.session());
 //routes
 app.use("/project",post);
 app.use("/user",user);
 app.use(key);
 app.use("/project",project);
 app.use("/amiami",amiami);
 app.use("/server",serverRoutes);
 // testing 
 app.use("/test",testRoutes);





export { app }