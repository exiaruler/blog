import React, { useEffect, useState,useRef } from 'react';
import Util from '../api/Util';
import ReactBase from '../ReactBase';
 const DeleteModal=(props:any)=>{
    const util=new Util();
    const reactBase=new ReactBase();
    //debugger;
    const id=props.id;
    var displayItem="";
    if(!props.show){
        return null;
    }
    if(props.item==undefined){
        displayItem=props.id;
    }else{
        displayItem=props.item;
    }
    const deleteCall=()=>{
        const call={
            method:"Delete",
            url:props.http+id,
        };
        debugger;
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
        <h4 className='modal-title'>Do you want to delete this {displayItem}</h4>
        </div>
        <div className='modal-body'>
        <button className='modal-deletebtn' onClick={deleteCall}>Delete</button>
        </div>
        <div className='modal-footer'>
        <button className='button' onClick={props.onClose} >Cancel</button>
        </div>
        </div>
        </div>
    );
}
export default DeleteModal;