const blog=require('../model/blog');
import * as express from 'express';
import { fstat } from 'fs';
const router=express.Router();
import { send } from 'process';
const verifyPost=require('./middleware/verifyPost');
const verifyLogin=require('./middleware/verifyLogin');
import { PostController } from '../controller/PostController';
const upload = require('../multer/upload');
const multer  = require('multer')
//const upload = multer({ dest: './uploads/' })
const fs = require('fs');
var path = require('path');
const postContr=new PostController();

router.post('/add-blog',verifyLogin,verifyPost,upload.single('image'),async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.createPost(req,resp);
});
router.post('/upload',upload.single("image"),(req, resp: express.Response, next: express.NextFunction)=>{
  //const {data:file,contentType:string}=req.files;
   //console.log(req.files);
   const image=req.files;
   //console.log(image.name);
  // Handle the uploaded file
  resp.json({ message: 'File uploaded successfully!' })
});

router.get('/get-all-blog/:page',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.getAllPost(req,resp);
});

router.get('/get-a-blog/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.getPost(req,resp);
});
     

router.get('/get-blog-topic',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{

});

    
router.put('/edit-blog/:id',verifyLogin,verifyPost,async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.updatePost(req,resp);     
});

router.delete('/delete-blog/:id',verifyLogin,async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    postContr.deletePost(req,resp);
});

router.delete('/delete-all',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    blog.remove({},function(err,result){
        if(err){ throw err;}
        resp.send(result);
    })
});

module.exports = router;