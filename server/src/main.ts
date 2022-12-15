import { app } from './index';
import * as http from 'http';
//import * as mongoose from 'mongoose';
import mongoose from 'mongoose';
const port = 8000;
const server = http.createServer(app);
const MONGO_URI = 'mongodb+srv://admin:123@cluster0.l6cgy.mongodb.net/blog?retryWrites=true&w=majority';
server.listen(port);
server.on('listening', async () => {
	console.info(`Listening on port ${port}`);
	mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true});
	mongoose.connection.on('open', () => {
		console.info('Connected to Mongo.');
		console.info('http://localhost:8000/');
	});
	mongoose.connection.on('error', (err: any) => {
		console.error(err);
	});
});