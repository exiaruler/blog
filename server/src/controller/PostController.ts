const blog=require('../model/blog');
import { Response, Request, response } from "express";
export class PostController{
    constructor(){
        new blog();
    }
    async createPost(req:Request,res:Response){
        const {user,title,topic,body}=req.body;
        try{
            const date=new Date();
            const currentDate=  date.getMonth()-1+ "/" + (date.getDate()) + "/" + date.getFullYear();
            const add=await new blog({title: title,topic:topic,user:user,body:body,date:currentDate,image:""}).save();
            if(add){
                console.log(add);
                res.status(200).send("success");

            }
        }catch(err){
            res.status(200).send(err);
        }

    
    }
    async getAllPost(req:Request,res:Response){
        var page:any=req.params['page']; 
        page=page-1;
        var start =(page*10)-1;
        if(start==-1){
            start=0;
        }
        try{
            const docs=await blog.find().exec()
            .then(docs=>{
                var items = docs.map((item) => { return {id: item._id, title: item.title,topic:item.topic,user:item.user,date:item.date,body:item.body}});
                items=items.reverse();
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
// calculate page limit whole number
function calculateLimit(page: number): number {
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
