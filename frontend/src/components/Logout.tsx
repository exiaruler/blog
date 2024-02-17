import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import Util from '../api/Util';

class Logout extends React.Component {
    private util=new Util();
     logOut= async () => {
      const call={
        method:"Post",
        url:this.util.getUrlBase()+"/logout",
        withCredentials:true
      };
      const res=this.util.axiosCall(call);
       res.then((resp: any)=>{
        window.location.href = "/"
       });

      }
    
    render() {
      return(   
        <div> 
<Link to="/" onClick={this.logOut}>Logout</Link>
        </div>
      );
    }
  }
  export default Logout;
  