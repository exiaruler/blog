const key=require('../model/key');
import * as express from 'express';
const router=express.Router();
const random = require('random-string-generator');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secret');
const hash=10;
router.post('/generate-key',async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const keyGen=random(15);
    const {adminPerm}=req.body;
    // hash key
    const addKey=new key({key:keyGen,adminPermission:adminPerm});
    await addKey.save();
    resp.send("Key created");
});
// get permission key for general calls
router.get('/get-key/',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const param =false;
    key.find({adminPermission:param})
    .exec()
    .then(doc=>{
        const encrypt=doc[0].key;
        resp.status(200).json(encrypt);
    })
    .catch(err=>{
        console.log(err);
        resp.status(500).json({error:err});
    });
});


module.exports = router;
