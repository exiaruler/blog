import { app } from './index';
import {UserController} from './controller/UserController';
import {Settings} from './Settings';
require('dotenv').config();
import * as http from 'http';
const setting=new Settings();
const port = setting.port
const server = http.createServer(app);
const userControl= new UserController();

server.listen(port);
server.on('listening', async () => {
	console.info(`Listening on port ${port}`);
	setting.startup();
});