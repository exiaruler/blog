import React, {  useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
  import LogoutComponent from '../components/Logout';
function NavBar(prop:any){
const [admin,setAdmin]=useState(false);

const adminTools=()=>{
    var role=prop.role
    if(prop.role!=null){
      setAdmin(true);
    }else{
      setAdmin(false);
    }
 
}

useEffect(() => {
  adminTools();
     
   },);
   
return (
    <div>
       <nav>
         <li className="nav">
            
           <li>  <a> <Link to="/home">Home</Link> </a>    </li>
           <li>  <a> <Link to="/about-me">About Me</Link></a></li>
           <li>  <a><Link to="/Coming-Soon">Blog</Link> </a> </li>
           {admin ? 
            <li> <a><Link to="/manage">Manage</Link> </a> </li>
           :null}
            {admin ? 
            <li> <a>  <LogoutComponent/></a> </li>
           :null}
         </li>
         </nav>

    </div>
)
  }
export default NavBar;