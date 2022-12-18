import React, { useState,useEffect,useRef } from 'react';
import { useForm,SubmitHandler } from "react-hook-form";
import axios from 'axios';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import Footer from '../components/Footer';
import 'draft-js/dist/Draft.css';
  function BlogEntry() {
  const [topic,setTopic]=useState("");
  const [body,setBody]=useState("");
  const [title,setTitle]=useState("");
  const [user,setUser]=useState("");
  const [titleError,setTitleError]=useState("");
  const [topicError,setTopicError]=useState("");
  const [bodyError,setBodyError]=useState("");
  const history = useHistory();
  const [image,setImage]=useState(null);
  const getUser = async () =>{
    await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8000/user",
    }).then((res) => {
      if(!res.data){
        history.push("/login");
        history.go(0);
      }
      setUser(res.data.name);
    });
  }
  const onInputChangeFile=(e:any)=>{
    setImage(e.target.files[0]);
    console.log(image);
  };
  const post=()=>{
    setTopicError("");
    axios({
      method:"post",
      data:{
        title:title,
    topic:topic,
     body:body,
     user:user
      },
      withCredentials:true,
      url:"http://localhost:8000/add-blog",
      
    }).then((resp)=>{
      const data=resp.data;
    console.log(data);
    if(data=="success"){
      history.push("/blog");
    }else{
      for(var i=0; i<data.length; i++){
        var error=data[i];
        if(error.user){
          history.push("/login");
        }
        if(error.title){
         setTitleError(error.title);
        }
        if(error.topic){
          setTopicError(error.topic);
        }
        if(error.body){
          setBodyError(error.body);
        }
      
      }
    }
    }
    );
  };
    useEffect(() => {
      getUser();
    },);
    return (
      
        <div>
          <div className="row">
          <div className="column">
            </div>
          <div className="column">
        <h1>Blog Entry</h1>
        <div className='column'>
          <p> <label>Heading</label>
          <input id='title-input' type="text" placeholder={titleError}   value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </p>
          <p>
        <label>topic</label>
        <select name="topic" value={topic} onChange={(e)=>setTopic(e.target.value)}>
          <option value=""></option> 
          <option value="cosplay">cosplay</option>
          <option value="figures">figures</option>
          <option value="gunpla">gunpla</option>
          <option value="Projects">projects</option>
          </select>
          {topicError}
          </p>
          <p>
        <textarea className="textarea" placeholder={bodyError} rows={30} value={body} onChange={(e)=>setBody(e.target.value)}/>
        </p>
        <p>
         <label>image</label>
         <input type='file'  onChange={onInputChangeFile} name="image"/> 
        </p>
         <input type="submit" onClick={post} ></input>
         </div>
        </div>
        <div className="column">
            
            </div>
        </div>
        </div>
      
    
    )};
 
export default BlogEntry;
