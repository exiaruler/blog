import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Util from '../api/Util';
import BlogBox from '../components/BlogBox';
import BlogParagraph from '../components/BlogParagraph';
import {
  BrowserRouter
    as Router, Route, Link, useParams, BrowserRouter,useNavigate
} from "react-router-dom";

  function BlogView(props:any) {
    const[title,setTitle]=useState("");
    const[date,setDate]=useState("");
    const[body,setBody]=useState([]);
    const history=useNavigate();
    const util=new Util();
    let {id} = useParams();
    const getBlog = () =>{
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8000/get-a-blog/"+id
      }).then((res) => {
       const entry=res.data;
       const convertDate=util.dateConversionMonth(entry.date);
       setTitle(entry.title);
       setDate(convertDate);
       setBody(entry.body);
      });
    }
    const back=()=>{
      history("/blog");
    }
    useEffect(() => {
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