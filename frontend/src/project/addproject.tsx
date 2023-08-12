import React, { useEffect, useState,useRef } from 'react';
import Util from '../api/Util';
import ReactBase from '../ReactBase';
 const AddProject=(props:any)=>{
    const util=new Util();
    const reactBase=new ReactBase();
    const id=props.projectId;
    var updateBtn=true;
    var addBtn=false;
    var displayItem="";
    var form={
        name:"",
        haveUrl:"",
        url:""
    };
    var disabledUrlInput=true;
    const [formTest,setFormTest]=useState({
        name:"",
        haveUrl:"",
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
            data=util.setJsonValue(form,'haveUrl',"");
        }
        form=data;
    }
    if(id!=""){
        insertData();
        title="Update Project"
        updateBtn=false;
        addBtn=true;
    }
    
    const addCall=()=>{
        const call={
            method:"Post",
            url:util.getUrlBase()+"/add-project",
            data:form,
            withCredentials:true
        };
        debugger;
       const res= util.axiosCall(call);
       res.then((resp)=>{
        if(resp?.status==200){
            reactBase.routerReload();
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
        debugger;
       const res= util.axiosCall(call);
       res.then((res)=>{
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
        
        if(value==true){
            debugger;
            var text=document.querySelector("UrlInput");
            if(text){
            text.setAttribute("disabled","false");
            }
            disabledUrlInput=false;
        }else disabledUrlInput=true;
        
        console.log(form);
      }
    
    return(
        <div className='modal' onClick={props.onClose}>
        <div className='modal-content' onClick={e=>e.stopPropagation()}>
        <div className='modal-header'>
        <h4 className='modal-title'>{title}</h4>
        </div>
        <div className='modal-body'>
        <label>Project</label>
        <input id='NameInput' name="name" defaultValue={props.projectName} onChange={(e)=>onChange(e.target.name,e.target.value)}></input>
        <label>Does it Have URL</label>
        <input id='checkboxUrl' type="checkbox" name="haveUrl" onChange={(e)=>onChangeCheck(e.target.name,e.target.checked)}></input>
        <label>url</label>
        <input id="UrlInput" name="url" disabled={true} onChange={(e)=>onChange(e.target.name,e.target.value)}></input>
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