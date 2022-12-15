import React, { useState,useEffect } from 'react';
import BlogList from '../components/bloglist';
import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter
} from "react-router-dom";
import axios from 'axios';
  function Blog(prop:any){    
    useEffect(() => {
    },[]);
    return(
      <div>
        <BlogList api="http://localhost:8000/get-all-blog/" user={true}/>
      </div>
    );
  }
  
  
export default Blog;