import React, { Component, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    useHistory,
    Redirect
  } from "react-router-dom";
  import axios from 'axios';

  function Auth(){
    const [userSignedIn,setUserSignedIn] = useState(false);
     
      return(
        <div>
            <p>Not authorised</p>
        </div>
      )
  };
  export default Auth;