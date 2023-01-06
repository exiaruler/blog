import { Response, Request, response } from "express";
const project=require('../model/blog');
export class ProjectController{

    async createProject(req:Request,res:Response){
        const {name,url,haveUrl}=req.body;
        try{
            const add=await new project({projectName:name,projectUrl:url}).save();
            if(add){
                res.status(200).send("success");
            }
        }catch(err){
            res.status(400).send(err);
        }
    }
    async updateProject(req:Request,res:Response){
        const id = req.params['id'];
        const {name,url,haveUrl}=req.body;
        try{
            const update=await project.findByIdAndUpdate({projectName:name,projectUrl:url});
            if(update){
                res.status(200).send("success");
            }
        }catch(err){
            res.status(400).send(err);
        }
    }
    async deleteProject(req:Request,res:Response){
        const id = req.params['id'];
        try{
            const remove= await project.findByIdAndRemove(id);
            if(remove){
                res.status(200).send(id+" deleted");
            }
        }catch(err){
            res.status(400).send("project does not exist");
        }
    }
    async getAllProjects(req:Request,res:Response){
        try{
            const docs=await project.find().exec();
            /*
            .then(docs=>{
                var items = docs.map((item) => { return {id: item._id, name:item.projectName,url:item.projectUrl}});
                res.json(items);
            });
            */
            res.json(docs);
        }catch(err){
            res.status(400).send(err);
        }
    }
    async getProject(req:Request,res:Response){
        try {
            const doc = await project.findById(req.params.id).exec();
            res.json(doc);
          } catch (e) {
              res.status(400).send("Cannot find "+req.params.id);
          }
    }
}