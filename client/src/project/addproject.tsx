import React, { useEffect, useState,useRef } from 'react';
import Util from '../api/Util';
import ReactBase from '../ReactBase';
 const AddProject=(props:any)=>{
    const util=new Util();
    const reactBase=new ReactBase();
    const id=props.id;
    var displayItem="";
    const [form,setForm]=useState({
        name:"",
        haveUrl:"",
        url:""
    });
    const [disabledUrlInput,setDisabledUrlInput]=useState(true);
    var title="Add Project";
    if(!props.show){
        return null;
    }
    if(props.item==undefined){
        displayItem=id;
    }else{
        displayItem=props.item;
    }
    if(id!=undefined){
        title="Update Project"
        util.setAttributeValue('UpdateBtn','hidden','false');
    }
    const addCall=()=>{
        const call={
            method:"Post",
            url:util.getUrlBase+"/add-project",
            data:form,
            withCredentials:true
        };
       const res= util.axiosCall(call);
       res.then((resp)=>{
        debugger;
        if(resp?.status==200){
            reactBase.routerReload();
        }
       });
        
    }
    const updateCall=()=>{
        const call={
            method:"Put",
            url:"/update-project",
            data:form,
            withCredentials:true
        };
       const res= util.axiosCall(call);
       res.then((res)=>{
        if(res?.status==200){
            reactBase.routerReload();
        }
       });
        
    }
    const onChange= (key:any,value:any)=>{
        setForm({...form,[key]:value});
      }
    const onChangeCheck= (key:any,value:any)=>{
        setForm({...form,[key]:value});
        if(value==true){
            setDisabledUrlInput(false);
        }else
        setDisabledUrlInput(true);
      }
    
    return(
        <div className='modal' onClick={props.onClose}>
        <div className='modal-content' onClick={e=>e.stopPropagation()}>
        <div className='modal-header'>
        <h4 className='modal-title'>{title}</h4>
        </div>
        <div className='modal-body'>
        <label>Project</label>
        <input name="name" onChange={(e)=>onChange(e.target.name,e.target.value)}></input>
        <label>Does it Have URL</label>
        <input id='checkboxUrl' type="checkbox" name="haveUrl" onChange={(e)=>onChangeCheck(e.target.name,e.target.checked)}></input>
        <label>url</label>
        <input id="UrlInput" name="url" disabled={disabledUrlInput} onChange={(e)=>onChange(e.target.name,e.target.value)}></input>
        <button className='modal-deletebtn' onClick={addCall}>Add</button>
        <button id='UpdateBtn' className='modal-deletebtn' onClick={updateCall} hidden={true}>Update</button>
        </div>
        <div className='modal-footer'>
        <button className='button' onClick={props.onClose} >Cancel</button>
        </div>
        </div>
        </div>
    );
}
export default AddProject;