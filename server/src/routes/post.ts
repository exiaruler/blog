const blog=require('../model/blog');
import { debug } from 'console';
import * as express from 'express';
import { fstat } from 'fs';
const router=express.Router();
const user=require('../model/user');
const passport=require('passport');
import { send } from 'process';
const verifyPost=require('./middleware/verifyPost');
const key=require('../model/key');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secret');
const fs = require('fs');
var path = require('path');
var multer = require('multer');
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
    console.log(req.body);
    const {user,title,topic,body}=req.body;
    //get date
   const date=new Date();
   const currentDate=  date.getDate()+ "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  await new blog({title: title,topic:topic,user:user,body:body,date:currentDate,image:""}).save();
   resp.send("success");
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
    var page:any=req.params['page']; 
    page=page-1;
    var start =(page*10)-1;
    if(start==-1){
        start=0;
    }
    const items =blog.find({}, null, {sort: {'_id': -1}}, function (err, docs) {
        if (err) throw err;
        var items = docs.map((item) => { return {id: item._id, title: item.title,topic:item.topic,user:item.user,date:item.date,body:item.body}});
        var output=[];
        for(var i=start; i<items.length; i++){
            if(output.length==10){
                break;
            }
            output.push(items[i]);
        }
        var pageLim=items.length/10;
        if(items.length<10){
            pageLim=1;
        }
        var checkDec=pageLim%1;
        if(checkDec!=0){
            pageLim=calculateLimit(pageLim);
        }
        var result={
            "total":items.length,
            "limit":pageLim,
            "output":output
        };
        resp.json(result);
    });
});
function calculateLimit(page){
    var sum=1;
    var num=1;
    var cal=false;
    while(!cal){
        sum=num-page;
        if(1>sum&&sum>=0.1){
          break;
        }
        num++;
    }
    return num;
}
router.get('/get-a-blog/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const search = req.params['id'];
    blog.findById(search)
    .exec()
    .then(doc=>{
        resp.status(200).json(doc);
    })
    .catch(err=>{
        resp.status(500).json({error:err});
    });


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