import React, { useEffect, useState } from 'react';
import axios from 'axios';
  export interface BlogProps{}

  export interface Blog{
    id:number;
    title:String;
    user:String;
    topic:String;
    body:String;
    date:Date;


  
  }
  const Blog:React.FunctionComponent<BlogProps>=(props)=> {
    const [blogs,setBlogs]=useState<Blog[]>([]);
  
    const getBlogs = async () =>{
      await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8000/get-all-blog",
      }).then((res) => {
        setBlogs(res.data);
      });
    }
    useEffect(() => {
   getBlogs();
      
    }, []);

    return (
     
        <div>
          <div>
            <h1>Blog entries</h1>
          </div>
          <ul>
            {blogs.map(blog=>(
              <li key={blog.id}>
                <li>{blog.title}</li>
                <li>{blog.user}</li>
                <li>{blog.topic}</li>
                <li>{blog.date}</li>
              </li>
            ))}
          </ul>
        
        </div>
      
    
    )};
  
export default Blog;