import React from "react";

export const Square = (props) => {
  const color = props.value === 'X' ? '#808080' : '#fffefe';
  const colorSelected = props.isSelectedSqr ? '#efde15' : 'aquamarine';
  const colorWinner = props.colorWinner;
  const backgroundColor = colorWinner ? colorWinner : colorSelected;

  return (
    <button 
      className="square"
      style={{color: color, backgroundColor: backgroundColor}}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}