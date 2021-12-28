import React from 'react';

  import Footer from './components/Footer';
  function aboutme() {
    return (
      
        <div>
          <div className="row">
            <div className="column">
            
            </div>
           
          <div className="column">
          <h1>About Me</h1>
        <p>Hi my name is Samuel, I am a graduate from University of Technology Sydney in Bachelor of science of IT majoring enterprise systems development. 
         My personal hobbies and interest are gaming, watching tv-series and anime and building stuff from electronics and gunpla.</p>

          <p> My career goal is working in software engineering in a full-stack role, with an interest in working in areas such as web development and iOS app development.
            I enjoy designing and building innovative applications that solve real-world problems or improve how we complete a task in our daily lives especially in the current circumstances that the world is in.
          </p>
          <p></p>
          <h2>Current Projects</h2>
          <ul className="bodyText">
            <li>Blog Features of this website</li>
            <li>Perfect Grade Gundam Exia Smart Button Pusher</li>
          </ul>
         
          </div>
          <div className="column">

          </div>

          </div>
          <div className="footer">
          <Footer/>
          </div>
         
        </div>

      
      
    
    )};
  
export default aboutme;