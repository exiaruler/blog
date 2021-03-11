import React, { useEffect, useState } from 'react';

import axios from 'axios';


function Home() {
  const [item, setItems] = useState<any>(null);

 
  const getUser = async () =>{
    await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8000/user",
    }).then((res) => {
      setItems(res.data);
      console.log(res.data);
      
     
    });
  }


  useEffect(() => {
    getUser();
    
  }, []);



  return(
  <div>
      <p>{item?.username}</p>
      <p>{item?.id}</p>
  </div>
  )
}

export default Home;