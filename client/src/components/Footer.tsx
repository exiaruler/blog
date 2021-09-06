import insta from '../assets/insta.png';
import linkedin from '../assets/linkin.png';
function Footer(){
        
return(
<div>
    
<div className="disclaimer">
        <div className="social-icons">
        <a href="https://www.instagram.com/nyafigurecollection/"><img src={insta} alt="instagram logo" width="30" height="30"/></a>
<a href="https://www.linkedin.com/in/samuel-li-34ba34169/"><img src={linkedin} alt="linkedIn link" width="30" height="30"/></a>
</div>
        <p>Use of this website is used for personal and promotion use, content not for sale or advertising. 
                
        </p>
        </div>
</div>
)
}
export default Footer;