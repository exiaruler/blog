import React, { useState,useEffect } from 'react';
import APIUtil from '../api/Util';
const apiUtil=new APIUtil();
function BlogBox(details:any){
    const [date,setDate]=useState("");
    const dateConversion=()=>{
        setDate(apiUtil.dateConversionMonth(details.date));
    }
    useEffect(()=>{
        dateConversion();
    }  
)
    return(
        <div className='blog-entry'>
            <h1>{details.title}</h1>
            <div className='blog-entry-date'>
            <p>{date}</p>
            </div>
        </div>
    );
}
export default BlogBox;