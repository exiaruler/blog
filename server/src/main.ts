import { app } from './index';
import {UserController} from './controller/UserController';
require('dotenv').config();
import * as http from 'http';
//import * as mongoose from 'mongoose';
import mongoose from 'mongoose';
const port = process.env.PORT_HOST;
const server = http.createServer(app);
const MONGO_URI = process.env.MONGO_KEY;
const userControl= new UserController();
server.listen(port);
server.on('listening', async () => {
	console.info(`Listening on port ${port}`);
	mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true});
	mongoose.connection.on('open', () => {
		console.info('Connected to Mongo.');
		console.info('http://localhost:8000/');
		userControl.addAdminUser();
	});
	mongoose.connection.on('error', (err: any) => {
		console.error(err);
	});
});