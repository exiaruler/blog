import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogBox from '../components/BlogBox';
import BlogParagraph from '../components/BlogParagraph';
import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter,useHistory
} from "react-router-dom";
import { title } from 'process';
import { totalmem } from 'os';
  function BlogView(props:any) {
    const[title,setTitle]=useState("");
    const[date,setDate]=useState("");
    const[body,setBody]=useState([]);
    const [cPage,setCPage]=useState(1);
    const history=useHistory();
    const getBlog = () =>{
      debugger;
      const id=props.match.params.id;
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8000/get-a-blog/"+id
      }).then((res) => {
       const entry=res.data;
       setTitle(entry.title);
       setDate(entry.date);
       setBody(entry.body);
       //console.log(entry.body.split(" "));
      });
    }
    const back=()=>{
      history.push("/blog");
    }
    useEffect(() => {
      console.log(props);
      getBlog();
      
    },);
    return (
        <div>
          <div className='BackBtn'>
            <button onClick={back}>Back</button>
          </div>
        <div className='entry-header' >
        <div className="left"><h1>{title}</h1></div>
        <div className="right"><p>{date}</p></div>
          </div>
        <div className='post-body'>
          <p>{body}</p>
          <img src={'https://www.tradeinn.com/f/13768/137680981/bandai-freedom-gundam2.0-model-kit-mobile-suit-gundam-seed.jpg'} alt="linkedIn link" width="50%" height="50%" style={{alignSelf:'right'}}/>
        </div>
        </div>
      
    
    )};
  
export default BlogView;