/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useEffect, useState } from "react";
import Util from './api/Util';
import ReactBase from './ReactBase';
import Footer from './components/Footer';
import ProjectList from "./components/ProjectList";
import { link } from "fs";
import { Link } from "react-router-dom";

  export default function aboutme()  {
    const util=new Util();
    const reactBase=new ReactBase();

   
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
          <ProjectList/>
          
          </div>
          <div className="column">

          </div>
          <div className="footer" id="Footer">
      <Footer/>
      </div>
          </div>
      
         
        </div>

      
      
    
    )};