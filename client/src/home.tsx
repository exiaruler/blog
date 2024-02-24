import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './components/Footer';
import App from './App';

function Home() {
  const [item, setItems] = useState<any>(null);
 const app=App;
 
  const getUser = async () =>{
    await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8000/user/user",
    }).then((res) => {
      setItems(res.data);
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
      <div className="footer" id="Footer">
        <Footer/>
        </div>
      </div>
  
     
    
  </div>
  )
}

export default Home;