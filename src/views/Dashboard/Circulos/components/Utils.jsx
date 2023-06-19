// CI URBANO RURAL
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
