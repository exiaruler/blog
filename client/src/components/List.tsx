import React, { useEffect, useState } from 'react';
import axios from 'axios';
export interface Blog{
    id:number;
    title:String;
    user:String;
    topic:String;
    body:String;
    date:Date;  
  }
function List(prop:any){
    const url=prop.url;
    const edit=false;
    const [admin,setAdmin]=useState(false);
    const viewUrl=prop.viewUrl;
    const [blogs,setBlogs]=useState<Blog[]>([]);

    const getList = async () =>{
        var cookies=undefined;
         cookies=document.cookie.split('; ').find(row=>row.startsWith('auth'))?.split('=')[1].toString();
          await axios({
            method: "POST",
            withCredentials: true,
            data:{
              encryKey:cookies
            },
            url: url,
          }).then((res) => {
            setBlogs(res.data);
          });
        }
    useEffect(() => {
            getList();
              
        }, []);
    return(
    <div>


    </div>
    );
}
export default List;