import { Form } from 'react-bootstrap';

const Select = ({ className, id, name, value, label, optionText, onChange, onBlur, disabled, mapFunction }) => {

  return (
    <div className={className || 'form-group col-md-12 mb-3 d-flex'}>
      {label && (
        <Form.Label className='col-md-6 m-md-2 text-secondary' htmlFor={id}>
          {label}
        </Form.Label>
      )}

      <Form.Select
        className='form-control'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled || false}
      >
        <option className='text-center' value='0'>
          {optionText}
        </option>
        {mapFunction}
      </Form.Select>
	  
    </div>
  );
};

export default Select;

