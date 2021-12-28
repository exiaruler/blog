import React, { Component, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    useHistory
  } from "react-router-dom";
import {Dropdown, DropdownButton,Navbar,Container} from 'react-bootstrap';
 
function NavBarMobile(){
  

    return (
        <div className="dropdown">
            <Dropdown.Toggle >
                Menu
            </Dropdown.Toggle>
    <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
         <button className="dropbtn">Menu</button>
         <div id="myLinks">
       <nav>
           <li>  <a> <Link to="/home">Home</Link> </a>    </li>
           <li>  <a> <Link to="/about-me">About Me</Link></a></li>
           <li>  <a><Link to="/Coming-Soon">Blog</Link> </a> </li>
         </nav>
        </div>
        </div>
    )
}
export default NavBarMobile;