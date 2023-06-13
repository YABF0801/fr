

// SUBMISION
export const renderTypeRadios = (data, name, form) => {
  return data.map((item, index) => (
    <div className='form-check form-check-inline' key={index}>
      <input
        className='form-check-input'
        type='radio'
        id={item}
        name={name}
        value={item}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        checked={form.values[name] === item}
      />
      <label className='form-check-label' htmlFor={item}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </label>
    </div>
  ));
};

// PARENTS
// data es array 
// name es atributo del esquema
// parentNumber = 0, 1
export const renderOccupationRadios = (data, name, form, idNum, parentNum) => {
    return data.map((item, index) => (
      <div className='form-check form-check-inline' key={index}>
        <input
          className='form-check-input'
          type='radio'
          id={`${item}${idNum}`}
          name={`child.parents[${parentNum}].${name}`}
          value={item}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          checked={form.values.child?.parents?.[parentNum][name] === item}
        />
        <label className='form-check-label' htmlFor={`${item}${idNum}`}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </label>
      </div>
    ));
  };


      