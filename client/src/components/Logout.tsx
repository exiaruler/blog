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
import Util from '../api/Util';

class Logout extends React.Component {
  private util=new Util();
     logOut= async () => {
      const call={

      };
        await axios({
          method: "POST",
          withCredentials: true,
          url: "http://localhost:8000/logout"
        }).then((resp)=>console.log(resp));
        window.location.href = "/home"
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
  