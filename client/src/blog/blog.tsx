import React, { useState,useEffect } from 'react';
import BlogList from '../components/bloglist';
import Footer from '../components/Footer';
import BaseLayout from '../components/BaseLayout';
import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter
} from "react-router-dom";
import Util from '../api/Util';
  function Blog(prop:any){    
    const util=new Util();
    useEffect(() => {
    },[]);
    return(
      <div>
        <div className='row'>
        <div className='column'>
        </div>
        <div >
        <BlogList api={util.getUrlBase()+"/get-all-blog/"} user={true}/>
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