import React, { Component, useEffect, useState } from "react";
import RoutesSwitch from './components/Route-Component';
import AdminBar from './components/AdminBar';
import './index';
import ProtectedRoute from './ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  useHistory
} from "react-router-dom";
import axios from 'axios';
import { Container,Row,Col } from 'react-bootstrap';




function App() {
  const [item, setItems] = useState<any>(null);
  const history = useHistory();
  const [showLogout, setShowLogout] = useState(false);
  const [showLogin,setShowLogin] = useState(true);
  const [userSignedIn,setUserSignedIn] = useState(false);

  const getUser = async () =>{
  
    try{
      await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8000/user",
      }).then((res) => {console.log(res.data);
        //check if user logged in 
       if(res.data!=userSignedIn){
          setUserSignedIn(true);
          //set user information
        setItems(res.data);
        //console.log(res.data);
        //hide and show nav bar
        setShowLogin(false);
        setShowLogout(true);
      
       }
      });
    }catch(err) {
      console.error(err.message);
    }
  }
   //console.log(user);

  const LoginLink=()=> <div> 
  <Link to="/login">Login</Link>
  </div>;
  
  const ManageLink=()=> <div> 
    <Router> 
   
    </Router>
    <Link to="/manage">Manage</Link>
  </div>;


//  <ProtectedRoute exact path='/manage' component={Manage} />
  useEffect(() => {
    getUser();
    
  }, []);



  return (
    <Router>
      <div>
        <div className="header">
          <h1>Nya Website</h1>
        </div>

    
    <div className="topnav">
      <nav>
             
          <a> <Link to="/home">Home</Link> </a>
          <a> <Link to="/about-me">About Me</Link></a>
                 <a><Link to="/Coming-Soon">Blog</Link> </a> 
         
        </nav>
    </div>
    <div>
      {showLogout?<AdminBar/>:null}
    </div>
    <div >
        {showLogout ? <h1>Welcome {item?.name}</h1>:null}
       </div>
    
      </div>
      
      <RoutesSwitch/>
    </Router>
  )};
 

export default App;
