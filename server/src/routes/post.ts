const blog=require('../model/blog');
import * as express from 'express';
import { fstat } from 'fs';
const router=express.Router();
const user=require('../model/user');
const passport=require('passport');
import { send } from 'process';
const verifyPost=require('./middleware/verifyPost');
import { PostController } from '../controller/PostController';
const fs = require('fs');
var path = require('path');
var multer = require('multer');
const postContr=new PostController();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
router.post('/add-blog',verifyPost,upload.single('image'),async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.createPost(req,resp);
});

router.post('/test',upload.single("image"),(req, resp: express.Response, next: express.NextFunction)=>{
 //const {data:file,contentType:string}=req.file;
   console.log(req.file);
   //const test=fs.readFileSync(path.join( "./src/"+ '/uploads/' + req.files));
   /*
   const image={
       data:req.file.path,
       name:"test"
   }
   */
    //console.log(Image);
   resp.send("success");
});

router.get('/get-all-blog/:page',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.getAllPost(req,resp);
});

router.get('/get-a-blog/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.getPost(req,resp);
});
     

router.get('/get-blog-topic',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{

});

    
router.put('/edit-blog/:id',verifyPost,async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.updatePost(req,resp);     
});

router.delete('/delete-blog/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.deletePost(req,resp);
});

router.delete('/delete-all',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    blog.remove({},function(err,result){
        if(err){ throw err;}
        resp.send(result);
    })
});

module.exports = router;