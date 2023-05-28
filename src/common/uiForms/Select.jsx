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
				<option className='text-center'>{optionText}</option>
				{mapFunction}
			</select>
		</div>
	);
};

export default Select;
