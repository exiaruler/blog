import React from 'react';
import {Route,Redirect} from 'react-router-dom';

export interface route{
    component:any;
    isSignedIn:boolean;


}

const ProtectedRoute = (props: route) => {
    const { component: Component, isSignedIn, ...rest } = props;
    return (
      <Route {...rest} render={
        props => <Component {...rest} {...props} />
      } />
    )
  }


export default ProtectedRoute;
