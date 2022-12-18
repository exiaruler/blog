import Footer from './Footer';
import React from 'react';
const BaseLayout=(children:any)=>{
    return(
        <>
        <div className='Row'>
        <div className="footer" id="Footer">
        <Footer/>
        </div>
        </div>
        <main>{children}</main>
        </>
    )
}
export default BaseLayout;