import React, {  useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
  import LogoutComponent from '../components/Logout';
 
function NavBar(prop:any){
const [admin,setAdmin]=useState(false);
const [user,setUser]=useState<any>(null);

const adminTools=()=>{
    if(prop.role!=null){
      setAdmin(true);
      setUser(prop.user);
    }else{
      setAdmin(false);
    }
 
}
const hrefStyle = {
  padding:"12px 30px"
};
useEffect(() => {
  adminTools();
   },);
   
return (
    <div>
       <nav>
         <li className="nav">
           <li>  <a> <Link to="/">Home</Link> </a>    </li>
           <li>  <a> <Link to="/about-me">About Me</Link></a></li>
           <li>  <a><Link to="/Coming-Soon">Blog</Link> </a> </li>
            {admin ? 
            <li className="dropdown">
            <a className="dropbtn" href="javascript:void(0)">{"Manage "+user}</a>
           <div className="dropdown-content">
            <a href="/post-blog" style={hrefStyle}>New post</a>
           <a><Link to="/manage">Manage</Link> </a>
           <a>  <LogoutComponent/></a>
           </div>
           </li>
           :null}
         </li>
         </nav>

    </div>
)
  }
export default NavBar;