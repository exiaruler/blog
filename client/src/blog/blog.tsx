import React, { useState,useEffect } from 'react';
import BlogList from '../components/bloglist';
import Footer from '../components/Footer';
import BaseLayout from '../components/BaseLayout';
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
        <div className='row'>
        <div className='column'>
        </div>
        <div >
        <BlogList api="http://localhost:8000/get-all-blog/" user={true}/>
        </div>
        <div className='column'>
        </div>
        </div>
        <div className="footer" id="Footer">
        <Footer/>
        </div>
      </div>
    );
  }
  
  
export default Blog;