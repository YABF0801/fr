import { useFormik } from 'formik';
import { setCurrentCurso } from '../../Circulos/service/circulo.services';
import ConsejosPopularesDropdown from './ConsejosPopularesAdmin';
import * as Yup from 'yup';
import { confirmAlert } from 'react-confirm-alert';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';

const AdministrationUtils = () => {
	const { resetearConsecutivo } = useOtorgamientoContext();

	const form = useFormik({
		initialValues: {
			curso: new Date().getFullYear,
		},
		validationSchema: Yup.object({
			name: Yup.number(),
		}),
		onSubmit: async (values, { resetForm }) => {
			await setCurrentCurso(values);
			resetForm();
		},
	});

	const handleResetConsecutivo = async () => {
		await resetearConsecutivo.mutate();
	};

	const confirmResetConsecutivo = (row) => {
		confirmAlert({
			message: `Va a resetear el número de entrada consecutivo de las planillas 
			a 0, ¿está seguro?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				{ className: 'save-btn', label: 'Resetear', onClick: () => handleResetConsecutivo() },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	return (
		<div className='row mb-3 '>
			<div className='d-flex flex-column'>
				<div className='p-3 d-flex flex-column '>
					<label htmlFor='curso' className='p-2 mb-2 text-secondary align-self-center'>
						Establecer año del curso actual
					</label>
					<div>
						<form className='d-flex align-items-center  gap-3' onSubmit={form.handleSubmit}>
							<input
								type='text'
								className='form-control'
								id='curso'
								name='curso'
								placeholder='Establecer curso actual'
								value={form.values.curso}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								autoFocus
							/>
							<button className='save-btn btn' type='submit'>
								Guardar
							</button>
						</form>
					</div>
				</div>

				<div className='p-3 d-flex flex-column'>
					
				<hr></hr>
					<label htmlFor='consecutivo' className='p-2 mb-2 text-secondary align-self-center'>
						Resetear número consecutivo de las planillas 
					</label>

					<div className='d-flex align-items-center gap-3'>
						<button
							className='btn save-btn w-100'
							onClick={confirmResetConsecutivo}
							data-tooltip-id='tooltip'
							data-tooltip-content='Resetear consecutivo'
							>Resetear consecutivo
						</button>
					</div>
				</div>

				<div className='d-flex flex-column'>
					<hr></hr>
					<label htmlFor='consejos' className='p-2 text-secondary align-self-center'>
						Administre consejos populares
					</label>
					<div className='d-flex align-items-center'>
						<ConsejosPopularesDropdown />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdministrationUtils;
