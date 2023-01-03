import React, { useState,useEffect,useRef,Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { useHistory,useParams } from "react-router-dom";
import Footer from '../components/Footer';
import Util from '../api/Util';
  function BlogEntry(props:any) {
  const util=new Util();
  const [user,setUser]=useState("");
  const [titleError,setTitleError]=useState("");
  const [topicError,setTopicError]=useState("");
  const [bodyError,setBodyError]=useState("");
  const history = useHistory();
  const [image,setImage]=useState(null);
  const [form,setForm]=useState({
    title:"",
    topic:"",
    user:"",
    body:""
  });
  const [updateBtn,setUpdateBtn]=useState(false);
  const [postBtn,setPostBtn]=useState(true);

  const getUser = async () =>{
    const response=util.getUser();
    response.then((res)=>{
      if(!res){
        history.push("/login");
        history.go(0);
      }
      setUser(res.name);
    });
  }
  const getPost = async () =>{
    const id=props.match.params.id;
    if(id!=undefined){
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8000/get-a-blog/"+id
    }).then((res) => {
      const data=res.data;
      var formData=util.setJsonValue(form,"title",data.title);
      formData=util.setJsonValue(form,"topic",data.topic);
      formData=util.setJsonValue(form,"body",data.body);
      formData=util.setJsonValue(form,"user",data.user);
      setForm(formData);
      setUpdateBtn(true);
      setPostBtn(false);
      util.setAttributeValue('topic-input','disabled','true')
    });
  }
  
  }
  const onChange= (key:any,value:any)=>{
    setForm({...form,[key]:value});
  }
  const onInputChangeFile=(e:any)=>{
    setImage(e.target.files[0]);
    console.log(image);
  };
  const update=async ()=>{
    const id=props.match.params.id;
    if(user==""){
      history.push("/login");
      return;
    }
    await axios({
      method:"put",
      data:form,
      withCredentials:true,
      url:"http://localhost:8000/edit-blog/"+id,
      
    }).then((resp)=>{
      const data=resp.data;
    if(data=="success"){
      history.push("/blog");
    }else{
      for(var i=0; i<data.length; i++){
        var error=data[i];
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
  }
  const post=()=>{
    setTopicError("");
    if(user==""){
      history.push("/login");
      return;
    }
    var formData=util.setJsonValue(form,"user",user);
    setForm(formData);
    axios({
      method:"post",
      data:form,
      withCredentials:true,
      url:"http://localhost:8000/add-blog",
      
    }).then((resp)=>{
      const data=resp.data;
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
      getPost();
      getUser();
    },[]);
   
    return (
      
        <div>
          <div className="row">
          <div className="column">
            </div>
          <div className="column">
        <h1>Blog Entry</h1>
        <div className='column'>
           <label>Heading</label>
          <input id='title-input' type="text" placeholder={titleError} value={form.title} name="title"  onChange={(e)=> onChange(e.target.name,e.target.value)}/>
          <p>
        <label>topic</label>
        <select name="topic" id='topic-input' value={form.topic}  onChange={(e)=>onChange(e.target.name,e.target.value)}>
          <option ></option> 
          <option value="cosplay">cosplay</option>
          <option value="figures">figures</option>
          <option value="gunpla">gunpla</option>
          <option value="Projects">projects</option>
          </select>
          {topicError}
          </p>
          <p>
        <label>Body</label>
        <textarea  name="body"  className="textarea" value={form.body} placeholder={bodyError} rows={30}  id='body-input' onChange={(e)=>onChange(e.target.name,e.target.value)}/>
        </p>
        <p>
         <label>Image</label>
         <input type='file'  onChange={onInputChangeFile} name="image"/> 
        </p>
        {postBtn ?
         <input id='PostBtn' value={"Post"} type="submit" onClick={post} ></input>
        :null}
         {updateBtn ?
         <input id='UpdateBtn' value={"Update"} type="submit" onClick={update}/>
          :null}
         </div>
        </div>
        <div className="column">    
        </div>
        </div>
        </div>
      
    
    )};
 
export default BlogEntry;


