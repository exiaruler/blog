import React, { Component, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    BrowserRouter,
  } from "react-router-dom";
import {Dropdown, DropdownButton,Navbar,Container} from 'react-bootstrap';
 
function NavBarMobile(){
  

    return (
        <div>
          <div className="dropdown">
  <button className="dropbtn"><h1>Menu</h1></button>
  <div className="dropdown-content">
    <a >Link 1</a>
    <a >Link 2</a>
    <a >Link 3</a>
  </div>
</div>
        </div>
    )
}
export default NavBarMobile;