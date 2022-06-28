import React from 'react';

const Sorter = ({options, value, onChange}) => {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(option => 
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        )}
      </select>
    </div>
  )
}

export default Sorter;