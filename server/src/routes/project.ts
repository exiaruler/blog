import * as express from 'express';
const router=express.Router();
import {ProjectController} from '../controller/ProjectController';
const verifyProject=require('./middleware/verifyProject');
const project=new ProjectController();
router.post('/add-project',verifyProject,(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.createProject(req,resp);
});
router.put('/update-project',verifyProject,(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.updateProject(req,resp);
});
router.delete('/delete-project',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.deleteProject(req,resp);
});
router.get('/get-project',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.getProject(req,resp);
});
router.get('/get-all-project',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.getAllProjects(req,resp);
});
module.exports = router;