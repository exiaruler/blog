// Use react libraries for UI functionality 
import React, {  useEffect, useState } from "react";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    useHistory
  } from "react-router-dom";
export default class ReactBase{
    private history=useHistory();
    public routerReload(){
        this.history.go(0);
    }
    public goTo(path:string,state:any){
        this.history.push(path,state)
    }
    
}