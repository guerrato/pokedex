import React from 'react';
import './style.css'

type Props = {
  href: string;
  text: string;
};

const DLink = ({href, text}:Props) => {
    return (
      <a className="detail_btn" href={href} target="_blank" rel="noopener noreferrer">{text}</a>  
    );
}
  
export default DLink;