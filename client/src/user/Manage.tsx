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
function Manage(){
        const [checkAdmin,setCheckAdmin]=useState(false);
        const getUser = async () =>{
            try{
              await axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:8000/user",
              }).then((res) => {console.log(res.data);
               // console.log(res.data);
              //if user role admin reavels link to admin manage page on page
               if(res.data.role=="admin"){
                setCheckAdmin(true);
                
               }
              
              });
            }catch(err) {
              console.error(err.message);
            }
        
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