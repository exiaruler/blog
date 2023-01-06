import React, { useEffect, useState,useRef } from 'react';
import Util from '../api/Util';
import ReactBase from '../ReactBase';
const addproject=(props:any)=>{
    const util=new Util();
    const reactBase=new ReactBase();
    const [form,setForm]=useState({
        name:"",
        haveUrl:false,
        url:""
    });
    if(!props.show){
        return null;
    }
    const addProject=()=>{
        const call={
            method:"Post",
            url:util.getUrlBase,
        };
       const res= util.axiosCall(call);
       res.then((res)=>{
        if(res?.status==200){
            reactBase.routerReload();
        }
       });
    }
    const updateProject=()=>{
        const call={
            method:"Put",
            url:util.getUrlBase,
        };
       const res= util.axiosCall(call);
       res.then((res)=>{
        if(res?.status==200){
            reactBase.routerReload();
        }
       });
    }
    
    return(
        <div className='modal' onClick={props.onClose}>
        <div className='modal-content' onClick={e=>e.stopPropagation()}>
        <div className='modal-header'>
        <h4 className='modal-title'>Add New Project</h4>
        </div>
        <div className='modal-body'>
        <input name='name'></input>
        <input name='haveUrl'></input>
        <input name='url'></input>
        </div>
        <div className='modal-footer'>
        <button className='button' onClick={props.onClose} >Cancel</button>
        </div>
        </div>
        </div>
    );
}
export default addproject;