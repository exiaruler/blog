const blog=require('../model/blog');
import { Response, Request, response } from "express";
import {UtilTool} from "../Util/UtilTool";
export class PostController{
    private util:UtilTool=new UtilTool();
    constructor(){
        new blog();
        //new ToolUtil();
    }
    async createPost(req:Request,res:Response){
        const {user,title,topic,body}=req.body;
        console.log(req.body);
        try{
            const currentDate=this.util.getDate()
            const add=await new blog({title: title,topic:topic,user:user,body:body,date:currentDate,image:""}).save();
            if(add){
                res.status(200).send("success");
            }
        }catch(err){
            res.status(500).send(err);
        }
    }
    async updatePost(req:Request,res:Response){
        const id = req.params['id'];
        const title=req.body['title']; 
        const topic=req.body['topic'];
        const body=req.body['body'];
        try{
            const update=await blog.findByIdAndUpdate(id,{"title": title,"topic":topic,"body":body});
            if(update){
                res.status(200).send("success");
             }
        }catch(err){
            res.status(500).send(err.message);
        }
    }
    async deletePost(req:Request,res:Response){
        try{
            const id = req.params['id'];
            const remove= await blog.findByIdAndRemove(id);
            if(remove){
                res.status(200).send(id+" deleted");
            }
        }catch(err){
            res.status(200).send("post does not exist");
        }
    }
    async getAllPost(req:Request,res:Response){
        const page:number=+req.params['page']; 
        try{
            const docs=await blog.find().exec()
            .then(docs=>{
                var items = docs.map((item) => { return {id: item._id, title: item.title,topic:item.topic,user:item.user,date:item.date,body:item.body}});
                const result=this.util.createPageList(items,page);
                res.json(result);
            });
        }catch(e){
            res.status(200).send("Something went wrrong");
        }
    }
    async getPost(req: Request, res: Response) {
        try {
          const doc = await blog.findById(req.params.id).exec()
          res.json(doc);
        } catch (e) {
            res.status(200).send("Cannot find "+req.params.id);
        }
      }
}
