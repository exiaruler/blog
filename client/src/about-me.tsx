/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useEffect, useState } from "react";
import Util from './api/Util';
import ReactBase from './ReactBase';
import Footer from './components/Footer';
import AddProject from './project/AddProject';
import DeleteModal from "./components/DeleteModal";
  export default function aboutme() {
    const [showProjectTools,setShowProjectTools]=useState(false);
    const [addModal,setAddModal]=useState(false);
    const [deleteModal,setDeleteModal]=useState(false);
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
    const openDeleteModal=()=>{
      const response=util.getUser();
      response.then((res)=>{
      if(!res){
        reactBase.routerReload();
      } 
      });
      //var data=util.setJsonValue(selectBlog,"id",id);
      //data=util.setJsonValue(selectBlog,"item",item);
      //setSelectBlog(data);
      setDeleteModal(true);
    }

    const closeDeleteModal=()=>{
      setDeleteModal(false);
    }
    const openAddModal=(id:any,namae:string,url:any)=>{
      const getUser=util.getUser();
      getUser.then((resp)=>{
        if(resp){
          setAddModal(true);
        }else{
          reactBase.routerReload();
        }
      });
    }
    const closeAddModal=()=>{
      setAddModal(false);
    }

    useEffect(() => {
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
          {showProjectTools? <button onClick={()=>openAddModal("test","test","test")}>Add Project</button> :null}
          <AddProject show={addModal} onClose={closeAddModal}/>
          <ul className="bodyText">
            <li>Blog Features of this website
            {showProjectTools?  <button onClick={openDeleteModal}>Delete</button> :null}
            <DeleteModal show={deleteModal} id={"1"} http={"/delete-project/"} item={""} onClose={closeDeleteModal}/>
            {showProjectTools?  <button>Update</button> :null}
            </li>
            <li>arest control system</li>
          </ul>
         
          </div>
          <div className="column">

          </div>
          <div className="footer" id="Footer">
      <Footer/>
      </div>
          </div>
      
         
        </div>

      
      
    
    )};