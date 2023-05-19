import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DatePicker from 'react-datepicker';
import { FechaOmApiGet, resetFechaOm, saveFechaOm } from '../../../../utils/utiles.sevices';
import { Tooltip } from 'react-tooltip';
<Tooltip id="tooltip" effect='solid' className="diff-arrow" />

const DatePickerToOm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [existingDate, setExistingDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const omDate = await FechaOmApiGet();
      if (omDate) {
        setExistingDate(omDate);
      }
      setLoading(false);
    };
    fetchData();
  }, [existingDate, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    await saveFechaOm(selectedDate);
    setExistingDate(selectedDate);
  };

  const confirmDelete = () => {
    confirmAlert({
      message: `Está seguro de eliminar la fecha límite para el otorgamiento`,
      buttons: [
        {
          className: 'cancel-btn ',
          label: 'Cancelar',
          onClick: () => { },
        },
        {
          className: 'save-btn',
          label: 'Eliminar',
          onClick: () => handleDelete(),
        },
      ],
      className: 'button-group d-flex justify-content-evenly'
    });
  };

  const handleDelete = async () => {
    await resetFechaOm();
    setExistingDate(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const date = existingDate ? new Date(existingDate).toLocaleDateString() : null;


  return (
    <div className='pb-3 mb-4 gap-3 d-flex justify-content-end '>
      <div className='gap-3 form-check form-switch form-check-inline d-flex '>
        { existingDate ? (
          <>
            <p className='text-secondary'>Fecha para el otorgamiento masivo</p>
            <h3 className='text-secondary'>{ date }</h3>

            <button onClick={ confirmDelete }
              className='btn btn-sm'
            ><i className='action-btn bi bi-trash-fill'
              data-tooltip-id="tooltip"
              data-tooltip-content="Eliminar fecha"></i>
            </button>

          </>
        ) : (
          <>

            <DatePicker
              id='datePicker'
              selected={ selectedDate }
              onChange={ handleDateChange }
              dateFormat='dd/MM/yyyy'
              className='form-control '
              placeholderText='Nueva Fecha de otorgamimento'

            />

            <button id='icon' onClick={ () => handleSave() }
              className='btn btn-sm '
            ><i className='action-btn bi bi-check2-square'
              data-tooltip-id="tooltip"
              data-tooltip-content="Guardar fecha"></i>
            </button>



          </>
        ) }
      </div>
    </div>
  );
};

export default DatePickerToOm;
