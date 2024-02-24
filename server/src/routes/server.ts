import * as express from 'express';
const router=express.Router();
import { Settings } from '../Settings';
const setting=new Settings();
module.exports =router;
const verifyLogin=require('./middleware/verifyLogin');
const verifyAccess=require('./middleware/verifyAccess');

router.put('/change-mongo',verifyAccess,(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const {server}=req.body;
    const response=setting.changeConnection(server);
    resp.status(200).send(response);
    
});
