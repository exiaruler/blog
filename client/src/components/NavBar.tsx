import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    useHistory
  } from "react-router-dom";
function NavBar(){

return (
    <div>
       <nav>
         <li className="nav">
           <li>  <a> <Link to="/home">Home</Link> </a>    </li>
           <li>  <a> <Link to="/about-me">About Me</Link></a></li>
           <li>  <a><Link to="/Coming-Soon">Blog</Link> </a> </li>
         </li>
         </nav>

    </div>
)
}
export default NavBar;