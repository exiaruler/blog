import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory,
    Redirect
  } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';

  function Login() {
    const history = useHistory();
    const [userName,setUsername]=useState("");
  const [password,setPassword]=useState("");
  


    const loginUser= async (e: { preventDefault: () => void; })=>{
     e.preventDefault();
     try{
      await axios({
        method:"post",
        data:{
       username:userName,
       password:password
        },
        withCredentials:true,
        url:"http://localhost:8000/login",
        
      })
      //.then((resp)=>console.log(resp));
      .then((res : AxiosResponse) => {
        if (res.data === "Successfully Authenticated") {
         window.location.href = "/manage"
       }
      }, () => {
        console.log("Failure");
      })
      
      
    }catch(err){
      console.error(err.message);
    }
      
    };

    const checkUser = async () =>{
      try{
        await axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:8000/user",
        }).then((res) => {console.log(res.data);
          //console.log(res.data.role);
         if(res.data==null){
          window.location.href = "/"
          
         }
        });
      }catch(err) {
        console.error(err.message);
      }
  
    }

    useEffect(() => {
      checkUser();
      
    }, []);
    
    
    return (
      
        <div>
          <div>
        <h1>Login</h1>
        <p>Username</p>
        <input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
        <p>Password</p>
        <input placeholder="password"  onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={loginUser}>Login</button>
        </div>
        <p ></p>
        </div>
      
    
    )};
  
export default Login;