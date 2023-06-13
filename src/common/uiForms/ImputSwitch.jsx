
export const renderSwitchSelect = (name, label, form, check, func) => {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        name={name}
        value={form.values[name]}
        onChange={form.handleChange}
        onClickCapture={func}
        onBlur={form.handleBlur}
        checked={check === true} // form.values[name]
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};