import React, {  useEffect, useState } from "react";
import RoutesSwitch from './components/RoutePath';
import AdminBar from './components/AdminBar';
import './index';
import NavBar from "./components/NavBar";
import NavBarMobile from "./components/mobile/NavBarMobile";
import Footer from './components/Footer';
import APIUtil from "./api/Util";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import {isMobile} from 'react-device-detect';

function App() {
  const [item, setItems] = useState<any>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [showLogin,setShowLogin] = useState(true);
  const [userSignedIn,setUserSignedIn] = useState(false);
  const [mobileNav,setMobileNav]=useState(false);
  const [nav,setNav]=useState(false);
  const [role, setRole] = useState<any>(null);
  const [user,setUser]=useState<any>(null);
  const apiUtil=new APIUtil();
  const checkDevice=()=>{
    if(isMobile){
      //setMobileNav(true);
      setNav(true);
    }else{
      setNav(true);
    }
  }
  const getKey=()=>{
      const call={
        method:"GET",
        url:apiUtil.getUrlBase()+"/get-key",
        withCredentials:true
      };
      const res= apiUtil.axiosCall(call);
      res.then((resp:any)=>{
        const checkCookie=document.cookie.split('; ').find(row=>row.startsWith('auth'))?.split('=')[1];
        if(checkCookie==undefined){
          document.cookie="auth="+resp.data;
        }
      });
  }
  const getUser = () =>{
    const response=apiUtil.getUser();
    response.then((res)=>{
      //check if user logged in 
      console.log(res);
      if(res!=userSignedIn){
        setUserSignedIn(true);
        //set user information
      setItems(res);
      setRole(res?.role);
      setUser(res?.name);
      //hide and show nav bar
      setShowLogin(false);
      setShowLogout(true);
     }
    });
  }
  useEffect(() => {
    getKey();
    getUser();
    checkDevice();
  },[]);



  return (
      <div>
    { nav ?<NavBar role={role} user={user}/> :null }
    {mobileNav? <NavBarMobile/>:null}
    <div>
    </div>
    <RoutesSwitch/>
      </div>
    
  )};
 

export default App;
