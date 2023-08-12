
import React from 'react';
import axios from 'axios';
import home from '../home';
import aboutMe from '../about-me';
import blogview from'../blog/blogview';
import login from '../user/login';
import blog from '../blog/blog';
import manage from '../user/Manage';
import blogEntry from '../blog/blog-entry';
import AdminManage from '../user/Admin-Manage';
import comingSoon from '../temp/comingSoon';

import {
    Route,
    Routes
  } from "react-router-dom";
 
  function RoutePath(){
    return(
        <div>
            <Routes>
          <Route path='/' Component={home} />
          <Route path='/about-me' Component={aboutMe} />
          <Route
         path="/blog"
        Component={blog}>
          </Route>
          <Route
         path="/login"
        Component={login}>
          </Route>
          <Route
             path="/manage"
            Component={manage}>
          </Route>
          <Route
           path="/post-blog"
          Component={blogEntry}>
            </Route>
            <Route
           path="/edit-blog/:id"
          Component={blogEntry}>
            </Route>
            <Route
             path="/admin-manage"
            Component={AdminManage}>
              </Route>
              <Route
             path="/Coming-Soon"
            Component={comingSoon}>
              </Route>
              <Route
             path="/post/:id"
            Component={blogview}
            >
              </Route>
          </Routes> 
        </div>
    );
  }
  
 
  export default RoutePath ;
  