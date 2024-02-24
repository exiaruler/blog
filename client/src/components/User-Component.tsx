import axios from 'axios';
import React, { useEffect, useState } from 'react';
function UserComponent() {
  const [user,setUser]=useState<any>(null);
  const [auth,setAuth]=useState(false);

  useEffect (() =>{
  
    try{
       axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8000/user/user",
      }).then((res) => {console.log(res.data);
        //check if user logged in 
       if(res.data!=user){
          //set user information
        setUser(res.data);
        //console.log(res.data);
        setAuth(true);
      
       }
       
        
        
       
      });
    }catch(err) {
      console.error(err.message);
    }

    
  })
  return ;
}
 
export default UserComponent;