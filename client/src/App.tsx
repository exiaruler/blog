import React, { Component, useEffect, useState } from "react";
import RoutesSwitch from './components/Route-Component';
import AdminBar from './components/AdminBar';
import './index';
import ProtectedRoute from './ProtectedRoute';
import NavBar from "./components/NavBar";
import NavBarMobile from "./components/mobile/NavBarMobile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  useHistory
} from "react-router-dom";
import axios from 'axios';
import {isMobile} from 'react-device-detect';

function App() {
  const [item, setItems] = useState<any>(null);
  const history = useHistory();
  const [showLogout, setShowLogout] = useState(false);
  const [showLogin,setShowLogin] = useState(true);
  const [userSignedIn,setUserSignedIn] = useState(false);
  const [mobileNav,setMobileNav]=useState(false);
  const [nav,setNav]=useState(false);
  
  const checkDevice=()=>{
    if(isMobile){
      setMobileNav(true);
    }else{
      setNav(true);
    }
  }
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
    checkDevice();
  },[]);



  return (
    <Router>
      <div>
    { nav ?<NavBar/> :null }
    {mobileNav? <NavBarMobile/>:null}
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
