import * as express from 'express';
const router=express.Router();
const verifyProject=require('./middleware/verifyProject');
const verifyLogin=require('./middleware/verifyLogin');



module.exports = router;