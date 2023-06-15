

export const renderCheckboxGroup = (data, name, onSelect) => {
    return data.map((item, index) => (
      <div className='form-check form-check-inline' key={index}>
        <input
          className='form-check-input'
          type='checkbox'
          id={item}
          name={name}
          value={item}
          onChange={onSelect}
        />
        <label className='form-check-label' htmlFor={item}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </label>
      </div>
    ));
  };