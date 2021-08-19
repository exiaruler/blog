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
      <h1>Welcome to my world!</h1>
      <p>Welcome all to my page, this website contains links to my proffesional career and my hobbies</p>
        <h2>Links</h2>
        <h3>Cosplay</h3>
      <a href="https://www.instagram.com/nya_cosplays/"><img src={insta} alt="instagram logo" width="300" height="300" /></a>
      <h3>Figure Collection</h3>
      <a href="https://www.instagram.com/nyafigurecollection/"><img src={insta} alt="instagram logo" width="300" height="300"/></a>
      </div>
      <div className="column"></div>
     
      </div>
      <Footer/>
    
  </div>
  )
}

export default Home;