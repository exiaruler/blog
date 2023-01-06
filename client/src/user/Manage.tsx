import axios from "axios";
import React, {  useEffect, useState } from "react";
import Auth from '../components/Auth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";
import Util from '../api/Util';
import ReactBase from '../ReactBase';
function Manage(){
        const [checkAdmin,setCheckAdmin]=useState(false);
        const history=useHistory();
        const util=new Util();
        const reactBase=new ReactBase();
        const getUser = async () =>{
            const response=util.getUser();
            response.then((res)=>{
              if(!res){
                history.push("/login");
                reactBase.routerReload();
              }
              if(res.role=="admin"){
                setCheckAdmin(true);
               }
            });
        }       
        const AdminManageLink =()=>
        <div>
            <Link to="admin-manage">Admin Manage Menu</Link>
        </div>

        
  useEffect(() => {
    getUser();
    
  }, []);
    return(
        <div>
            <h1>Manage</h1>
            <Link to="/post-blog">New post</Link>
            <div>
           {checkAdmin ? <AdminManageLink/>:null}
            </div>
            
        </div>
    )
}
export default Manage;