// Use react libraries for UI functionality 
import React, {  useEffect, useState } from "react";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    BrowserRouter,
    useNavigate
  } from "react-router-dom";
import Util from './api/Util';
export default class ReactBase extends Util{
    private history=useNavigate();
    public routerReload(){
        this.history(0);
    }
    public goTo(path:string,state:any){
        this.history(path,state)
    }

    public refreshElement(id:any){
        var container = document.getElementById(id);
        var content = container?.innerHTML;
        //container.innerHTML= content; 
    }

    // api call for authorised routes 
    public async authRoutes(json:any){
        var res;
        const authCall={
            method: "GET",
            withCredentials:true,
          url:this.getUrlBase()+"/auth"
        };
        const auth=this.axiosCall(authCall);
        await auth.then(async (resp)=>{
            // redirects back to login
            if(resp?.status==401||resp==undefined){
                window.location.href = "/login"
            }
            if(resp?.status==200){
                try{
                    const call=await axios(json);
                    res=await call;
                  }catch(err){
                    console.error(err);
                  }
            }
        });
        return res;
    }
    
}