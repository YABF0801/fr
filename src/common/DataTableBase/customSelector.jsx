import { useState, forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const CustomSelector = forwardRef(({ checked, onCheckboxChange }, ref) =>
{
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
      onCheckboxChange(event.target.checked);
    };
  
    return (
      <div className='col-md-3 mb-3 form-check form-switch' ref={ref}>
        <input
          type='checkbox'
          className='form-check-input m-md-1'
          checked={isChecked}
          onChange={handleCheckboxChange}
          ref={ref}
        />
      </div>
    );
  });
  
  export default CustomSelector;
  
