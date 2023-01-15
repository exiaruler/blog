/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useEffect, useState } from "react";
import Util from './api/Util';
import ReactBase from './ReactBase';
import Footer from './components/Footer';
import AddProject from './project/AddProject';
import DeleteModal from "./components/DeleteModal";
import { link } from "fs";
import { Link } from "react-router-dom";
interface Project{
  _id:number,
  name:String,
  url:any

}
  export default function aboutme() {
    const [showProjectTools,setShowProjectTools]=useState(false);
    const [addModal,setAddModal]=useState(false);
    const [deleteModal,setDeleteModal]=useState(false);
    const [projects,setProjects]=useState<Project[]>([]);
    const [selProject,setSelProject]=useState({
      id:"",
      name:"",
      url:""
    });
    const util=new Util();
    const reactBase=new ReactBase();
    const getAllProjects=()=>{

    }
    const displayAdminTools=()=>{
      const getUser=util.getUser();
      getUser.then((resp)=>{
        if(resp){
          setShowProjectTools(true);
        }
      });

    }
    const openDeleteModal=(id:any,name:any)=>{
      const response=util.getUser();
      response.then((res)=>{
      if(!res){
        reactBase.routerReload();
      } 
      });
      var data=util.setJsonValue(selProject,'id',id);
      data=util.setJsonValue(selProject,'name',name);
      setSelProject(data);
      setDeleteModal(true);
    }

    const closeDeleteModal=()=>{
      setDeleteModal(false);
    }
    const openAddModal=(id:any,name:any,url:any)=>{
      const getUser=util.getUser();
      getUser.then((resp)=>{
        if(resp){
          var data=util.setJsonValue(selProject,'id',id);
          data=util.setJsonValue(selProject,'name',name);
          data=util.setJsonValue(selProject,'url',url);
          setSelProject(data);
          setAddModal(true);
        }else{
          reactBase.routerReload();
        }
      });
    }
    const closeAddModal=()=>{
      setAddModal(false);
    }
    const getProjects=()=>{
      const call={
        method:"Get",
        url:util.getUrlBase()+"/get-all-project"
      };
      const res=util.axiosCall(call);
      res.then((resp)=>{
        const data=resp?.data;
        setProjects(data);
      });
    }
    

    useEffect(() => {
      getProjects();
      displayAdminTools();
      
    },[]);
    return (
        <div>
          <div className="row">
            <div className="column">
            
            </div>
           
          <div className="column" >
          <h1>About Me</h1>
        <p>Hi my name is Samuel, I am a graduate software engineer from University of Technology Sydney in Bachelor of science of IT majoring enterprise systems development. 
         </p>
          <p> I love integrating my skills as software developer into my hobbies and passions from programming electronics using arduino to developing in the interest of my passions and current problems I face.
          </p>
          <p></p>
          <h2>Current Projects</h2>
          {showProjectTools? <button onClick={()=>openAddModal("","","")}>Add Project</button> :null}
          <AddProject show={addModal} onClose={closeAddModal} projectId={selProject.id} projectName={selProject.name} 
          projectUrl={selProject.url}/>
          {projects.map(project=>(
            <ul className="bodyText" key={project._id}>
            <li>
            <a href={project.url} >{project.name}</a>
            <DeleteModal show={deleteModal} id={selProject.id} http={util.getUrlBase()+"/delete-project/"} item={selProject.name} onClose={closeDeleteModal}/>
            </li>
            {showProjectTools?  <button onClick={()=>openAddModal(project._id,project.name,project.url)}>Update</button> :null}
            {showProjectTools?  <button onClick={()=>openDeleteModal(project._id,project.name)}>Delete</button> :null}
          </ul>
          ))
          }
          </div>
          <div className="column">

          </div>
          <div className="footer" id="Footer">
      <Footer/>
      </div>
          </div>
      
         
        </div>

      
      
    
    )};