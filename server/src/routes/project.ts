import * as express from 'express';
const router=express.Router();
import {ProjectController} from '../controller/ProjectController';
const verifyProject=require('./middleware/verifyProject');
const verifyLogin=require('./middleware/verifyLogin');
const project=new ProjectController();
router.post('/add-project',verifyLogin,verifyProject,(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.createProject(req,resp);
});
router.put('/update-project/:id',verifyLogin,verifyProject,(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.updateProject(req,resp);
});
router.delete('/delete-project/:id',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.deleteProject(req,resp);
});
router.delete('/delete-all-project',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.deleteAllProject(req,resp);
});
router.get('/get-project/:id',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.getProject(req,resp);
});
router.get('/get-all-project',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    project.getAllProjects(req,resp);
});
module.exports = router;