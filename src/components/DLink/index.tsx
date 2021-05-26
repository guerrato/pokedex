import React from 'react';
import './style.css'

const DLink = ({...props})=> {
    const key:string = props.key;
    const url:string = props.url;
    const text: string = props.text;

    return (
      <a className="detail_btn" key={key} href={url} target="_blank" rel="noopener noreferrer" >{text}</a>  
    );
}
  
export default DLink;