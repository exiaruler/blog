const blog=require('../model/blog');
import * as express from 'express';
const router=express.Router();
const user=require('../model/user');
const passport=require('passport');
const verifyPost=require('./middleware/verifyPost');



router.post('/add-blog',verifyPost,async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    //get user

   const user=req.body['user'];
    const title=req.body['title']; 
    const topic=req.body['topic'];
    const body=req.body['body'];
    //get date
   const date=new Date();
   const currentDate= date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  await new blog({title: title,topic:topic,body:body,date:currentDate}).save();
    //await post.save();
   resp.end();
});

router.get('/get-all-blog',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{

 try {
    let items: any = await blog.find({});
    items = items.map((item) => { return {id: item._id, title: item.title,topic:item.topic,user:item.user,date:item.date,body:item.body}});
    resp.json(items);
} catch (err) {
    resp.status(500);
    resp.end();
    console.error('Caught error', err);
}
});

router.get('/get-a-blog/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const search = req.params['id'];
    blog.findById(search)
    .exec()
    .then(doc=>{
        console.log(doc);
        resp.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
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

module.exports = router;