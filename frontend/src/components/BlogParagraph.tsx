import React, { useState,useEffect } from 'react';
export default function BlogParagraph(prop:any){

    const write =()=>{
        document.write("<p>test</p>");
    }
    useEffect(()=>{
        write();
    });
    return(
        <div>

        </div>
    );
}
