
import React from 'react';
import axios from 'axios';
import home from '../home';
import aboutMe from '../about-me';
import viewBlog from'../blog/blogview';
import login from '../user/login';
import blog from '../blog/blog';
import manage from '../user/Manage';
import blogEntry from '../blog/blog-entry';
import AdminManage from '../user/Admin-Manage';
import ProtectedRoute from '../ProtectedRoute';
import comingSoon from '../temp/comingSoon';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory, 
    Redirect
  } from "react-router-dom";
  
class Routes extends React.Component {
  routeArray=[
    {path:'/home',component:home},
    {path:'/about-me',component:aboutMe},
    {path:'/blog',component:blog},
    {path:'/login',component:login},
    {path:'/manage',component:manage},
  ];
    render() {
      var routePath=document.createElement("Route");
      var test=[]
      for(var i in this.routeArray){
        var line="<Route "+" exact path="+this.routeArray[i].path+" component="+this.routeArray[i].component+" </Route>";
        test.push(line);
        //routePath.appendChild(rout);
      }
      //console.log(test);
      
      
      return(   
        <div> 
      <Switch>
      <Route
       exact
       path="/"
       render={() => {
         return <Redirect to="/home" />;
       }}              
        /> 
        <Route 
        exact path="/home"
        component={home}> 
        </Route>
        <Route 
        exact path="/about-me" 
        component={aboutMe}>
        </Route>
        <Route
        exact path="/blog"
        component={blog}>
          </Route>
          <Route
        exact path="/login"
        component={login}>
          </Route>
          <Route
            exact path="/manage"
            component={manage}>
          </Route>
          <Route
          exact path="/post-blog"
          component={blogEntry}>
            </Route>
            <Route
          exact path="/edit-blog/:id"
          component={blogEntry}>
            </Route>
            <Route
            exact path="/admin-manage"
            component={AdminManage}>
              </Route>
              <Route
            exact path="/Coming-Soon"
            component={comingSoon}>
              </Route>
              <Route
            exact path="/post/:id"
            component={viewBlog}>
              </Route>
            
       
      </Switch>
        </div>
      );
    }
  }
  export default Routes ;
  