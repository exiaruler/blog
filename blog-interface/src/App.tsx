import React, { Component, useEffect, useState } from "react";
import LogoutComponent from './components/Logout';
import RoutesSwitch from './components/Route-Component';
import './index';
import ProtectedRoute from './ProtectedRoute';
import Manage from './user/Manage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  useHistory
} from "react-router-dom";
import axios from 'axios';




function App() {
  const [item, setItems] = useState<any>(null);
  const history = useHistory();
  const [showLogout, setShowLogout] = useState(false);
  const [showLogin,setShowLogin] = useState(true);
  const [user,setUser] = useState(false);

  const getUser = async () =>{
  
    try{
      await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8000/user",
      }).then((res) => {console.log(res.data);
        //check if user logged in 
       if(res.data!=user){
          setUser(true);
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
      <div >
        {showLogout ? <h1>Welcome {item?.name}</h1>:null}
       </div>

    <div>
        <nav>
                {showLogout ? <ManageLink/>:null}
        
              <Link to="/home">Home</Link>
          
                <Link to="/about-me">About Me</Link>
          
                {showLogin ? <LoginLink/>:null}
              
                <Link to="/blog">Blog</Link>
            
             {showLogout ? <LogoutComponent/>:null}
            
        </nav>
    </div>
        
      </div>
      <RoutesSwitch/>
     
    </Router>
  )};
 

export default App;
