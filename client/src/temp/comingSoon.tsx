import React from 'react';
import { useHistory } from "react-router-dom";
  import backButton from '../assets/back-button.png';
  import Footer from '../components/Footer';
  import { Container,Row,Col } from 'react-bootstrap';
  function ComingSoon() {
    const history=useHistory();
    
    function returnBack(){
      history.push("/home");
    }
    
    return (
      <div>

      <div className="row"> 
      <div className="column"></div>
      <div className="column"> 
          <div className="largeText">
        <h1>Coming Soon</h1>
        </div>
        <div className="container">
        <div className="center">
        <button className="backButton backHover" onClick={returnBack}>Home</button>
        </div>
        </div>
      
        </div>
        <div className="column">
          </div>
          
        </div>
        <div className="footer">
        <Footer/>
        </div>
        </div>
      
    
    )};
  
export default ComingSoon;