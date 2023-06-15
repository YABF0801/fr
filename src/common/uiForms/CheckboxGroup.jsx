
  export const renderCheckboxGroup = (data, name, onSelect) => {
    return data.map((item, index) => (
      <div className='form-check form-check-inline m-md-1' key={index}>
        <input
          className='form-check-input'
          type='checkbox'
          id={item.value}
          name={name}
          value={item.value}
          onChange={onSelect}
        />
        <label className='form-check-label' htmlFor={item.value}>
          {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
        </label>
      </div>
    ));
  };

  