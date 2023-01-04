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
import Util from '../api/Util';

  function Login() {
    const history = useHistory();
    const util=new Util();
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
     try{
      await axios({
        method:"post",
        data:form,
        withCredentials:true,
        url:"http://localhost:8000/login",
      })
      .then((res : AxiosResponse) => {
        if (res.data === "Successfully Authenticated") {
         window.location.href = "/manage"
       }else{
        const errorMsg=res.data;
        var errorData=util.setJsonValue(error,"userError",errorMsg.userNameError);
        errorData=util.setJsonValue(error,"passwordError",errorMsg.passwordError);
        errorData=util.setJsonValue(error,"validationError",errorMsg.loginError);
        setError(errorData)
       }
      }, (err) => {
        alert(err);
      })
    }catch(err){
      alert(err);
    }
      
    };

    const checkUser = async () =>{
    const response=util.getUser();
    response.then((res)=>{
      if(res){
        history.push("/manage");
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