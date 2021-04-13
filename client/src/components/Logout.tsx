import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";
  
class Logout extends React.Component {
     logOut= async () => {
        await axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:8000/logout"
        }).then((resp)=>console.log(resp));
        window.location.href = "/home"
      }
    
    render() {
      return(   
        <div> 
<Link to="/" onClick={this.logOut}>logout</Link>
        </div>
      );
    }
  }
  export default Logout;
  