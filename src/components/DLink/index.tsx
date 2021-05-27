import React from 'react';
import './style.css'

type Props = {
  id: string;
  text: string;
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
};

const DLink = ({id, text, onClick}:Props) => {
    return (
      <button type="button" className="detail_btn" id={id} onClick={onClick}>{text}</button>  
    );
}
  
export default DLink;