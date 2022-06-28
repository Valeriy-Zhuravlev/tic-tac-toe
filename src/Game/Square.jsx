import React from "react";

export const Square = (props) => {
  const color = props.value === 'X' ? '#808080' : '#fffefe';

  return (
    <button 
      className="square"
      style={{color: color}}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}