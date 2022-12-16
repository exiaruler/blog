const blog=require('../model/blog');
import { debug } from 'console';
import * as express from 'express';
import { fstat } from 'fs';
const router=express.Router();
const user=require('../model/user');
const passport=require('passport');
import { send } from 'process';
const verifyPost=require('./middleware/verifyPost');
import { PostController } from '../controller/PostController';
const key=require('../model/key');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secret');
const fs = require('fs');
var path = require('path');
var multer = require('multer');
const postContr=new PostController();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads")
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+'--'+file.originalname)
    }
});
const upload = multer({ storage: storage });
router.post('/add-blog',verifyPost,upload.single('image'),async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    //const imagePath=req.file.path;
   // const test=fs.readFileSync(path.join( "./src/"+ '/uploads/' + req.file.filename));
   /*
    const image={
        data:test,
        name:req.file.filename
    }
    */
    postContr.createPost(req,resp);
});

router.post('/test',upload.single("image"),async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
   // const {data:file,contentType:string}=req.file;
   console.log(req.body);
   const test=fs.readFileSync(path.join( "./src/"+ '/uploads/' + req.file.filename));
   /*
   const image={
       data:req.file.path,
       name:"test"
   }
   */
    //console.log(Image);
   resp.send("success");
});


router.post('/get-all-blog',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
const {encryKey}=req.body;
//var decryp=decrypt(encryKey);
const find=key.findOne({key:encryKey}, (err,find) => {
    if (err) throw err;
    if(find!=null){
        const items =blog.find({}, null, {sort: {'_id': -1}}, function (err, docs) {
            if (err) throw err;
            const items = docs.map((item) => { return {id: item._id, title: item.title,topic:item.topic,user:item.user,date:item.date,body:item.body}});
            resp.json(items);
        });
        
    }else{
        resp.sendStatus(404);
    }
  });

});
router.get('/get-all-blog/:page',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.getAllPost(req,resp);
});

router.get('/get-a-blog/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.getPost(req,resp);
});
     

router.get('/get-blog-topic',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{

});

    
router.put('/edit-blog/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const id = req.params['id'];
    const title=req.body['title']; 
    const topic=req.body['topic'];
    const body=req.body['body'];
    await blog.findByIdAndUpdate(id,{"title": title,"topic":topic,"body":body});
    resp.end();
       
});

router.delete('/delete-blog/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const id = req.params['id'];
 
    await blog.findByIdAndRemove(id);
    resp.end();
});

router.delete('/delete-all',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    blog.remove({},function(err,result){
        if(err){ throw err;}
        resp.send(result);
    })
});

module.exports = router;