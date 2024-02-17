import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
    useNavigate,
    redirect
  } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
import Util from '../api/Util';
import ReactBase from '../ReactBase';
  function Login() {
    const history = useNavigate();
    const util=new Util();
    const reactBase=new ReactBase();
    const [form,setForm]=useState({
      username:"",
      password:""
    });
    const [error,setError]=useState({
      userError:"Username",
      passwordError:"Password",
      validationError:""
    });

    const resetError=()=>{
      setError(errors=>({
        ...errors,
        userError:"Username",
        passwordError:"Password",
        validationError:""
      }));
    };
    const onHandleChange=(variable:any,property:any)=>{
      const setValue=util.setJsonValue(form,variable,property);
      setForm(setValue);
    }
    const loginUser= async (e: { preventDefault: () => void; })=>{
    // e.preventDefault();
    resetError(); 
    const call={
      method:"Post",
      url:util.getUrlBase()+"/login",
      data:form,
      withCredentials:true
    };
    const res= util.axiosCall(call);
       res.then((resp:any)=>{
        if (resp?.data === "Successfully Authenticated") {
          window.location.href = "/manage"
        }else{
         const errorMsg=resp?.data;
         var errorData=util.setJsonValue(error,"userError",errorMsg.userNameError);
         errorData=util.setJsonValue(error,"passwordError",errorMsg.passwordError);
         errorData=util.setJsonValue(error,"validationError",errorMsg.loginError);
         setError(errorData)
        }
       });
       
    };

    const checkUser = async () =>{
    const response=util.getUser();
    response.then((res)=>{
      if(res){
        history("/manage");
       }
    });
    }

    useEffect(() => {
      checkUser();
    }, []);
    
    
    return (
      
        <div className="rowForm">
          <div className="columnForm">
           </div>
          <div  className="columnForm">
        <h1>Login</h1>
        <p>Username</p>
        <input placeholder={error.userError} onChange={(e)=>onHandleChange("username",e.target.value)}/>
        <p>Password</p>
        <input placeholder={error.passwordError} onChange={(e)=>onHandleChange("password",e.target.value)} type="password"/>
        <p>{error.validationError}</p>
        <button onClick={loginUser}>Login</button>
        </div>
        <div className="columnForm"></div>
        </div>
      
    
    )};
  
export default Login;