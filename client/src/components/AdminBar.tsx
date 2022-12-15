import React, { Component, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    useHistory
  } from "react-router-dom";
  import LogoutComponent from '../components/Logout';
  function AdminBar(){
    return (
        <div>
            <div className="topnav">
                <nav>
                <a>  <LogoutComponent/></a>
                 <a>   <Link to="/manage">Manage</Link> </a> 
                </nav>

            </div>
        </div>
    )
  };
  export default AdminBar;