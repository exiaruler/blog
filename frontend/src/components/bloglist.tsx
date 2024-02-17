import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import Util from '../api/Util';
import BlogBox from './BlogBox';
import DeleteModal from '../components/DeleteModal';
import {
  BrowserRouter
    as Router, Route, Link, useParams, BrowserRouter,useNavigate
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
    const [deleteModal,setDeleteModal]=useState(false);
    const util=new Util();
    const pageButtonNextRef=useRef(null);
    const pageButtonBackRef=useRef(null);
    const api=prop.api;
    const [selectBlog,setSelectBlog]=useState({
      id:"",
      item:""
    });
    const history =useNavigate();

    const getBlogs = async () =>{
    var cookies=undefined;
    const call={
      method: "GET",
      withCredentials: true,
      url:api+page
    };
    /*
    debugger;
    const res= util.axiosCall(call);
    res.then((resp:any)=>{
      if(resp.data.limit==1){
        setNextBtn(true);
      }
      setPageMax(resp.data.limit);
      setBlogs(resp.data.output);
    });
    */
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
      const call={
        method: "GET",
        withCredentials: true,
        url:api+currentPage
      };
      const res= util.axiosCall(call);
      res.then((resp:any)=>{
        setBlogs(resp.data.output);
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
    const editEntry=(id:any)=>{
      history("/edit-blog/"+id);
    }
    const openDeleteModal=(id:any,item:String)=>{
      const response=util.getUser();
      response.then((res)=>{
      if(!res){
        history(0);
      } 
      });
      var data=util.setJsonValue(selectBlog,"id",id);
      data=util.setJsonValue(selectBlog,"item",item);
      setSelectBlog(data);
      setDeleteModal(true);
    }
    const closeDeleteModal=()=>{
      setDeleteModal(false);
    }
    useEffect(() => {
      getBlogs();
      checkUser();
      
      
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
        <button onClick={()=>openDeleteModal(blog.id,blog.title)}>Delete</button>
       :null}
       <DeleteModal show={deleteModal} id={selectBlog.id} http={util.getUrlBase()+"/delete-blog/"} item={selectBlog.item} onClose={closeDeleteModal}/>
        {admin ? 
        <button onClick={()=>editEntry(blog.id)} >Update</button>
       :null}
      </ul>
       ))}
      </div>
    </div>
    );
  }
