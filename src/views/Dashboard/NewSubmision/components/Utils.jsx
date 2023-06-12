
// data es array 
// name es atributo del esquema
// parentNumber = 0, 1

// PARENTS
export const renderSelectableRadios = (data, name, form, parentNumber) => {
    return data.map((item, index) => (
      <div className='form-check form-check-inline' key={index}>
        <input
          className='form-check-input'
          type='radio'
          id={`${item}1`}
          name={`child.parents[parentNumber].${name}`}
          value={item}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          checked={form.values.child?.parents?.[parentNumber][name] === item}
        />
        <label className='form-check-label' htmlFor={`${item}1`}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </label>
      </div>
    ));
  };