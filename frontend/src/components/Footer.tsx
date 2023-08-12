import insta from '../assets/insta.png';
import linkedin from '../assets/linkin.png';
import React, { useState,useEffect,useRef } from 'react';
function Footer(props:any){
const footer=useRef(null);
useEffect(()=>{
});
return(
<div>
<div className="disclaimer" id="DisclaimFooter" ref={footer}>
        <div className="social-icons">
        <a href="https://www.instagram.com/nyafigurecollection/"><img src={insta} alt="instagram logo" width="30" height="30"/></a>
        <a href="https://www.linkedin.com/in/samuel-li-34ba34169/"><img src={linkedin} alt="linkedIn link" width="30" height="30"/></a>
        </div>
  
        </div>
</div>
)
}
export default Footer;