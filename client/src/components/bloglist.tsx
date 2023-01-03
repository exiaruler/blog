import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import Util from '../api/Util';
import BlogBox from './BlogBox';
import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter,useHistory
} from "react-router-dom";
   interface Blog{
    id:number;
    title:String;
    user:String;
    topic:String;
    body:String;
    date:Date;  
  }
  export default function BlogList(prop:any){
    var [blogs,setBlogs]=useState<Blog[]>([]);
    const [error,setError]=useState("");
    const [page,setPage]=useState(1);
    const [pageMax,setPageMax]=useState(0);
    const [admin,setAdmin]=useState(false);
    const [nextBtn,setNextBtn]=useState(false);
    const [prevBtn,setPrevBtn]=useState(true);
    const util=new Util();
    const pageButtonNextRef=useRef(null);
    const pageButtonBackRef=useRef(null);
    const api=prop.api;
    const history =useHistory();
    //import APIUtil from '../api/Util';const apiUtil=new APIUtil();

    const getBlogs = async () =>{
    var cookies=undefined;
    cookies=document.cookie.split('; ').find(row=>row.startsWith('auth'))?.split('=')[1].toString();
      await axios({
        method: "GET",
        withCredentials: true,
        url:api+page
      }).then((res) => {
        if(res.data.limit==1){
          setNextBtn(true);
        }
        setPageMax(res.data.limit);
        setBlogs(res.data.output);
      });
    }
    const handleChange= async (value:number)=>{
      setPage(value);
      const currentPage=value;
      await axios({
        method: "GET",
        withCredentials: true,
        url:api+currentPage
      }).then((res) => {
        setBlogs(res.data.output);
      });
    }
    
    const getBlogsController = async (event:any) =>{
      const component=event.currentTarget.id;
      var currentPage=page;
      if(component=="PageControNextBtn"&&page<pageMax){
        setPage(page+1);
        setPrevBtn(false);
        currentPage=currentPage+1;
      }
      if(component=="PageControPrevBtn"){
        if(page!=1){
          setPage(page-1);
          currentPage=currentPage-1;
       }
       if(currentPage==1){
          setPrevBtn(true);
       }
      }
        await axios({
          method: "GET",
          withCredentials: true,
          url:api+currentPage
        }).then((res) => {
          setBlogs(res.data.output);
        });
      }
    const checkUser = () =>{
    const response=util.getUser();
    response.then((res)=>{
      if(res){
        setAdmin(true);
      } 
    });
    }
    const deleteEntry =()=>{
      try{

      }catch(err){

      }
    }
    const editEntry=(id:any)=>{
      history.push("/edit-blog/"+id);
    }
    useEffect(() => {
      getBlogs();
      if(prop.user!=undefined){
        checkUser();
      }
      
    },[]);
    return(
      <div>
      <div>
      </div>
      <div className="blog-list">
      <div id="PageController" className='pageHandler'>
      <button id="PageControPrevBtn" onClick={getBlogsController} hidden={prevBtn}>Back</button>
        <input value={page}/>
        <p> out of {pageMax} </p>
        <button id="PageControNextBtn" ref={pageButtonNextRef} onClick={getBlogsController}>Next</button>
        </div>
      {blogs.map(blog=>( 
      <ul key={blog.id}>
      <Link to={'/post/'+blog.id}>
      <BlogBox li  title={blog.title} date={blog.date}/> 
      </Link>
      {admin ? 
        <button>Delete</button>
       :null}
        {admin ? 
        <button onClick={()=>editEntry(blog.id)} >Update</button>
       :null}
      
      </ul>
       ))}
      </div>
    </div>
    );
  }
