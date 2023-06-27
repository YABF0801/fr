import PropTypes from 'prop-types';

const Select = ({ className, id, name, value, label, optionText, onChange, onBlur, disabled, mapFunction }) => {

  return (
    <div className={className || 'form-group col-md-12 mb-3 d-flex'}>
      {label && (
        <label className='col-md-6 m-md-2 text-secondary' htmlFor={id}>
         {label}
        </label>
      )}
      
      <select
        className='form-control'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled || false}
      >
        <option value='0'>
          {optionText}
        </option>
        {mapFunction}
      </select>
    </div>
  );
};

  
Select.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  optionText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  mapFunction: PropTypes.node,
};

export default Select;
