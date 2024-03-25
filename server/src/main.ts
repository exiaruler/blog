import { app } from './index';
import {Settings} from './settings';
require('dotenv').config();
import * as http from 'http';
const setting=new Settings();
const port = setting.port;
const server = http.createServer(app);

server.listen(process.env.PORT||port);
server.on('listening', async () => {
	console.info(`Listening on port ${port}`);
	setting.startup();
});