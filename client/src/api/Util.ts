import axios from 'axios';
//import {base} from './Base';
class Util {
 // private base:BaseURL=new BaseURL();
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
                data=res.data
              return data;
            } 
           });
         }catch(err) {
         }
         return data;
    }
    async getUserTest(){
      var res=await axios({
        method: "GET",
        withCredentials: true,
        url:"http://localhost:8000/user"}
        );
      const {data}=res.data;
      console.log(res);
      return data;
  }
    // converts date to show month style
    dateConversionMonth(date:any){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dateArr=date.split("/");
        const month = months[dateArr[0]];
        return dateArr[1]+" "+month+" "+dateArr[2]
    }
    elementGet(elementId:any){
      const get=document.getElementById(elementId);
      if(get!=null){
        const ele=get+".__reactProps$0ywopfjtiphh";
        return ele;
      }
      return "does not exist";
    }
   public getUrlBase(){
      return "http://localhost:8000/";
    }
   public setJsonValue(json:any,key:any,value:String){
      var currentJson=json;
      currentJson[key]=value;
      return currentJson;
    }
   public sendAlert(error:any){
      alert(error);
    }
    public setInputValue(element:any,attribute:any,value:any){
      document.getElementById(element)?.setAttribute(attribute,value);
    }
     
}
export default Util;