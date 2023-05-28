

const InputSwitch = ({ className, id, name, value, label, onChange, onBlur, defaultChecked}) => {
  return (
    <div className={className || 'col-md-2 mb-4 form-check form-switch'}>
    <input
      className='form-check-input '
      type='checkbox'
      id= {id}
      name={name}
      value={value}
      onChange={ onChange }
      onBlur={onBlur }
      defaultChecked ={defaultChecked || false}
    />

    <label
      htmlFor={id}
    >
      {label}
    </label>

</div>

  )
}

export default InputSwitch