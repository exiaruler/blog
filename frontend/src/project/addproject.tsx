import React, { useEffect, useState,useRef } from 'react';
import Util from '../api/Util';
import ReactBase from '../ReactBase';
 const AddProject=(props:any)=>{
    const util=new Util();
    const reactBase=new ReactBase();
    const id=props.projectId;
    var updateBtn=true;
    var addBtn=false;
    var checkbox="false";
    const urlInput=useRef(null);
    const checkRef=useRef(null);
    var err={
        nameErr:"",
        urlErr:""
    };
    var form={
        name:"",
        haveUrl:false,
        url:""
    };
    var disabledUrlInput=true;
    const [formTest,setFormTest]=useState({
        name:"",
        haveUrl:false,
        url:""
    });
    var title="Add Project";
    if(!props.show){
        return null;
    }
    const insertData=()=>{
        var data=util.setJsonValue(form,'name',props.projectName);
        data=util.setJsonValue(form,'url',props.projectUrl);
        if(props.projectUrl==""){
            data=util.setJsonValue(form,'haveUrl',false);
        }else{
            disabledUrlInput=false;
            data=util.setJsonValue(form,'haveUrl',true);
            document.getElementById('checkboxUrl')?.setAttribute('checked','true');
            
        }
        form=data;
    }
    const addCall=()=>{
        const call={
            method:"Post",
            url:util.getUrlBase()+"/add-project",
            data:form,
            withCredentials:true
        };
       const res= util.axiosCall(call);
       res.then((resp)=>{
        debugger;
        if(resp!.data=="success"){
            reactBase.routerReload();
        }else{
            var error=resp?.data;
            var data=util.setJsonValue(err,'nameErr',error.name);
            err=data;
            //err.nameErr=error.name;
        }
       });
        
    }
    const updateCall=()=>{
        const call={
            method:"Put",
            url:util.getUrlBase()+"/update-project/"+id,
            data:form,
            withCredentials:true
        };
       const res= util.axiosCall(call);
       res.then((res)=>{
        debugger;
        if(res?.status==200){
            reactBase.routerReload();
        }
       });
        
    }
    const onChange= (key:any,value:any)=>{
        console.log(form);
        form={...form,[key]:value};
        console.log(form);
      }
    const onChangeCheck= (key:any,value:any)=>{
        onChange(key,value);
        var text=document.getElementById('UrlInput');
        if(value==true){
            text!.removeAttribute('disabled');
        }else text!.setAttribute('disabled','true');
        console.log(form);
      }

    // on load effect
    if(id!=""){
        insertData();
        title="Update Project"
        updateBtn=false;
        addBtn=true;
    }
    
    
    
    return(
        <div className='modal' onClick={props.onClose}>
        <div className='modal-content' onClick={e=>e.stopPropagation()}>
        <div className='modal-header'>
        <h4 className='modal-title'>{title}</h4>
        </div>
        <div className='modal-body'>
        <label>Project</label>
        <input id='NameInput' name="name" defaultValue={props.projectName} placeholder={err.nameErr} onChange={(e)=>onChange(e.target.name,e.target.value)}></input>
        <div>
        <label>Does it Have URL</label>
        <input ref={checkRef} id='checkboxUrl' type="checkbox" name="haveUrl"  onChange={(e)=>onChangeCheck(e.target.name,e.target.checked)}></input>
        </div>
        
        <label>url</label>
        <input id="UrlInput" ref={urlInput} defaultValue={props.projectUrl} placeholder={err.urlErr} name="url" disabled={disabledUrlInput} onChange={(e)=>onChange(e.target.name,e.target.value)}></input>
        <p>{err.urlErr}</p>
        <button id="AddBtn" className='modal-deletebtn' hidden={addBtn} onClick={addCall}>Add</button>
        <button id='UpdateBtn' className='modal-deletebtn' onClick={updateCall} hidden={updateBtn}>Update</button>
        </div>
        <div className='modal-footer'>
        <button className='button' onClick={props.onClose} >Cancel</button>
        </div>
        </div>
        </div>
    );
}
export default AddProject;