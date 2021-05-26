import React from 'react';
import './style.css';

type Props = {
    text: string;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
};

const PokeSearch = ({text, onClick, onChange}:Props) => {
    return (
        <>
            <input type="text" name="pokeSearch" value={text} onChange={onChange}/>
            <button className={'search_btn'} type="button" onClick={onClick}>Search</button>
        </>
    );
}
  
export default PokeSearch;