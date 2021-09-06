import React, { useEffect, useState } from 'react';
import insta from './assets/insta.png';
import axios from 'axios';
import Footer from './components/Footer';

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
    <div className="row">
      <div className="column">
   
      </div>
      <p>{item?.username}</p>
      <p>{item?.id}</p>
      <div className="column">
        
          <div className="title">
          <h1 className="welcomeColour">Welcome to my website!</h1>
          <p>Please browse freely through my page and social media links</p>
          </div>
      
      
    
   
      </div>
      <div className="column"></div>
     
      </div>
      <div className="footer">
      <Footer/>
      </div>
     
    
  </div>
  )
}

export default Home;