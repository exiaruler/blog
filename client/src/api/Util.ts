import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
class Util{
    async getUser(){
        var data="";
        try{
            axios({
             method: "GET",
             withCredentials: true,
             url: "http://localhost:8000/user",
           }).then((res) => {
             //check if user logged in 
            if(res.data){
              debugger;
                data=res.data
              return data;
            } 
           });
         }catch(err) {
         }
         return data;
    }
    async getUserTest(){
      var res=await axios.get("http://localhost:8000/user");
      const {data}=res.data;
      console.log(res);
      return data;
  }
    // converts date to show month style
    dateConversionMonth(date:any){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        date=date.split("/");
        var convertedDate=new Date(date);
        const month = months[convertedDate.getMonth()];
        return date[1]+" "+month+" "+date[2]
    }
    elementGet(elementId:any){
      const get=document.getElementById(elementId);
      if(get!=null){
        const ele=get+".__reactProps$0ywopfjtiphh";
        return ele;
      }
      return "does not exist";
    }
     
}
export default Util;