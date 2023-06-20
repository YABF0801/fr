import ConsejosPopularesDropdown from './ConsejosPopularesAdmin';

const AdministrationUtils = () => {
	return (
		<div className='row mb-3  c'>
			<div className='d-flex flex-column gap-4 m-3'>
				<div className='d-flex flex-column '>
					<label htmlFor='curso' className='p-2 text-secondary align-self-start'>
						Explicación
					</label>
					<div className='d-flex align-items-center  gap-3'>
						<input type='text' id='curso' className='form-control' placeholder='Establecer curso' />
						<button type='button' className='btn save-btn'>
							Guardar
						</button>
					</div>
				</div>

				<div className='d-flex flex-column'>
					<label htmlFor='consecutivo' className='p-2 text-secondary align-self-start'>
						Explicación
					</label>
					<div className='d-flex align-items-center gap-3'>
						<input
							type='text'
							id='consecutivo'
							className='form-control'
							placeholder='Establecer consecutivo'
						/>
						<button type='button' className='btn save-btn'>
							Guardar
						</button>
					</div>
				</div>

				<div className='d-flex flex-column'>
					<label htmlFor='consejos' className='p-2 text-secondary align-self-start'>
						Explicación
					</label>
					<div className='d-flex align-items-center gap-3'>
						<ConsejosPopularesDropdown />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdministrationUtils;
