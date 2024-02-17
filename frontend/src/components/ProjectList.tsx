import React, {  useEffect, useState } from "react";
import Util from '../api/Util';
import ReactBase from '../ReactBase';
import ProjectRow from './ProjectRow';
import AddProject from '../project/addproject';
import DeleteModal from "../components/DeleteModal";
import { link } from "fs";
import { Link } from "react-router-dom";
interface Project{
  _id:number,
  name:String,
  url:any

}
  
  function ProjectList(){
    const [showProjectTools,setShowProjectTools]=useState(false);
    const [addModal,setAddModal]=useState(false);
    const [deleteModal,setDeleteModal]=useState(false);
    const [projects,setProjects]=useState<Project[]>([]);
    const [selProject,setSelProject]=useState({
      id:"",
      name:"",
      url:"",
      update:false
    });
    const util=new Util();
    const reactBase=new ReactBase();
    var listString="";
    const displayAdminTools=()=>{
      const getUser=util.getUser();
      getUser.then((resp: any)=>{
        if(resp){
          setShowProjectTools(true);
        }
      });

    }
    const openDeleteModal=(id:any,name:any)=>{
      const response=util.getUser();
      response.then((res: any)=>{
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
      getUser.then((resp: any)=>{
        if(resp){
          var data=util.setJsonValue(selProject,'id',id);
          data=util.setJsonValue(selProject,'name',name);
          data=util.setJsonValue(selProject,'url',url);
          if(id!=""){
            data=util.setJsonValue(selProject,'update',true);
          }else{
            data=util.setJsonValue(selProject,'update',false);
          }
          setSelProject(data);
          setAddModal(true);
        }else{
          reactBase.routerReload();
        }
      });
    }
    const closeAddModal=()=>{
      setAddModal(false);
      getProjects();
    }
    const getProjects=()=>{
      const call={
        method:"Get",
        url:util.getUrlBase()+"/get-all-project"
      };
      debugger;
      const res=util.axiosCall(call);
      res.then((resp:any)=>{
        const data=resp?.data;
        setProjects(data);
      });
      renderList(projects);
    }
    const renderList=(projectsArr:any)=>{
      //listString
      if(projectsArr.length>0){
        for(var i=0; i<projectsArr.length; i++){
          var project=projectsArr[i];
          var row="";
          //debugger;
          if(project.url==""){
            row="<p>"+project.name+"</p> ";
          }else{

          }
          listString=row;
        }
      }
    }
    useEffect(() => {
      getProjects();
      displayAdminTools();
    },[]);
    return (
        <div>
            {showProjectTools? <button onClick={()=>openAddModal("","","")}>Add Project</button> :null}
          <AddProject show={addModal} onClose={closeAddModal} projectId={selProject.id} projectName={selProject.name} update={selProject.update}
          projectUrl={selProject.url} />
          {projects?.map(project=>(
            
            <ul className="bodyText" key={project._id}>
            <li>
            <ProjectRow name={project.name} url={project.url}/>
            <DeleteModal show={deleteModal} id={selProject.id} http={util.getUrlBase()+"/delete-project/"} item={selProject.name} onClose={closeDeleteModal}/>
            </li>
            {showProjectTools?  <button onClick={()=>openAddModal(project._id,project.name,project.url)}>Update</button> :null}
            {showProjectTools?  <button onClick={()=>openDeleteModal(project._id,project.name)}>Delete</button> :null}
          </ul>
          ))
          }
        </div>
    )
  };
  export default ProjectList;