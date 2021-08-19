import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import linkedin from './assets/linkin.png';
  import Footer from './components/Footer';
  function aboutme() {
    return (
      
        <div>
          <div className="row">
            <div className="column">
            
            </div>
           
          <div className="column">
          <h1>About me</h1>
        <p>Samuel/Nya is a software developer that is currently studying at the University of Technology Sydney in Bachelor of science of IT. 
          He is also a cosplayer and builder of many things as he want to intergrate his career into his hobbies in many ways.</p>
          <h2>Current Projects</h2>
          <ul className="bodyText">
            <li>Blog Features of this website</li>
            <li>Perfect Grade Gundam Exia Smart Button Pusher</li>
          </ul>
          <div>
            <h2>Links</h2>
            <a href="https://www.linkedin.com/in/samuel-li-34ba34169/"><img src={linkedin} alt="linkedIn link" width="300" height="300"/></a>
          </div>      
          </div>
          <div className="column">

          </div>

          </div>
    
          <Footer/>
        </div>

      
      
    
    )};
  
export default aboutme;