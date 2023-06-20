import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { cursoApiGet, setCurrentCurso } from '../../Circulos/service/circulo.services';
import ConsejosPopularesDropdown from './ConsejosPopularesAdmin';
import * as Yup from 'yup';
import { confirmAlert } from 'react-confirm-alert';

const AdministrationUtils = () => {
	const [consecutivo, setConsecutivo] = useState();
	const [curso, setCurso] = useState();

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
			fetchCurso(); // Actualizar el listado después de crear un nuevo consejo
		},
	});

	useEffect(() => {
		fetchConsecutivo();
		fetchCurso();
	}, []);

	const fetchConsecutivo = async () => {
		const consecutivo = await cursoApiGet();
		if (consecutivo) {
			setConsecutivo(consecutivo);
		}
	};

	const fetchCurso = async () => {
		const curso = await cursoApiGet();
		if (curso) {
			setCurso(curso);
		}
	};

	return (
		<div className='row mb-3 '>
			<div className='d-flex flex-column'>
				<div className='p-3 d-flex flex-column '>
					<label htmlFor='curso' className='p-2 text-secondary align-self-start'>
						Explicación
					</label>
					<div >
						<form
							className='d-flex align-items-center  gap-3'
							onSubmit={form.handleSubmit}
						>
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
					<hr></hr>
					<label htmlFor='consejos' className='p-3 text-secondary align-self-start'>
						Consejos populares
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
