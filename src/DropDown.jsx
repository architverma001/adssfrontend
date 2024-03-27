import React from 'react';

function DropDown({ className,options, selectedOption, setSelectedOption,setIsCarDropdownOpen,setIsCarSelected }) {
  return (
    <div className={`${className} dropdown`}>
      {options.map((option) => (
        <div
          key={option}
          className={`option pointer ${
            selectedOption === option ? 'selected' : ''
          }`}
          onClick={() => {
            // Print selected option to console
            setSelectedOption(option);
            console.log(selectedOption); 
            setIsCarDropdownOpen(false);
            setIsCarSelected(true);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export default DropDown;
