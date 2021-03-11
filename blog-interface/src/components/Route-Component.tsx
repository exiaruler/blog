
import React from 'react';

import home from '../home';
import aboutMe from '../about-me';
import viewBlog from'../blog/blog-view';
import login from '../user/login';
import blog from '../blog/blog';
import manage from '../user/Manage';
import blogEntry from '../blog/blog-entry';
import AdminManage from '../user/Admin-Manage';
import ProtectedRoute from '../ProtectedRoute';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";
  
class Routes extends React.Component {
  
    render() {
      return(   
        <div> 
 <Switch>
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
            exact path="/admin-manage"
            component={AdminManage}>
              </Route>
              
            
       
      </Switch>
        </div>
      );
    }
  }
  export default Routes ;
  