/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useEffect, useState } from "react";
import Util from './api/Util';
import ReactBase from './ReactBase';
  import Footer from './components/Footer';
  export default function aboutme() {
    const [showProjectTools,setShowProjectTools]=useState(false);
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
    const addNewProject=()=>{
      /*
      const getUser=util.getUser();
      getUser.then((resp)=>{
        if(resp){

        }else{
          reactBase.routerReload();
        }
      });
      */
     //debugger;
      //reactBase.routerReload();
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
          {showProjectTools? <button onClick={addNewProject}>Add Project</button> :null}
          <ul className="bodyText">
            <li>Blog Features of this website
            {showProjectTools?  <button>Delete</button> :null}
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