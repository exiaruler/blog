import React, { useState } from 'react';
import axios from 'axios';

  function BlogEntry() {
    const [topic,setTopic]=useState("cosplay");
  const [body,setBody]=useState("");
  const [title,setTitle]=useState("");

    const post=()=>{
      axios({
        method:"post",
        data:{
          title:title,
      topic:topic,
       body:body,
       
        },
        withCredentials:true,
        url:"http://localhost:8000/add-blog",
        
      }).then((resp)=>console.log(resp));

      //console.log(userName,password);
    };
    
     //console.log(topic);
    //console.log(body);
    return (
      
        <div>
          <div>
        <h1>Blog Entry</h1>
        <form onSubmit={post}>
         <label>Heading</label>
          <input type="text"  value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <label>topic</label>
          <select name="topic" value={topic} onChange={(e)=>setTopic(e.target.value)}>
          <option value="cosplay">cosplay</option>
          <option value="figures">figures</option>
          <option value="gunpla">gunpla</option>
          <option value="Projects">projects</option>
          </select>
         <label>body</label>
         <input type="text" value={body} onChange={(e)=>setBody(e.target.value)}></input>
         <input type="submit" ></input>
        

        </form>
        
        </div>
       
        </div>
      
    
    )};
  
export default BlogEntry;