import React, {  useEffect, useState } from "react";
const ProjectRow =(props:any)=>{
var html="";
if(props.url==""){
    html="<p>"+props.name+"</p>"
}else{
    html="<a href="+props.url+" aria-disabled='true' >"+props.name+"</a>";
}
return (
<div dangerouslySetInnerHTML={{ __html: html }} />
);
}
export default ProjectRow;