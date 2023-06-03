import * as Yup from 'yup';
import {
	validateStringMin2,
	validateCirculoType,
	validateAttendance,
	naturalNumber,
} from '../yupValidations/validateInputFunctions';

export const CirculoSchema = Yup.object().shape({
	number: Yup.number()
		.required('El número es requerido')
		.test('attendance', 'El número debe ser mayor que 0', (value) => naturalNumber(value)),

	name: Yup.string()
		.required('El nombre es requerido')
		.test('letras minimo 2', 'El Nombre debe tener más de 2 caracteres', (value) => validateStringMin2(value)),

	circulotype: Yup.string().test('circulo tipo', 'El tipo de círculo no es válido', (value) =>
		validateCirculoType(value)),

	isCiActive: Yup.boolean(),

	curso: Yup.number(),

	normed_capacity2: Yup.number()
		.required('La capacidad es requerida')
		.test('attendance', 'El número debe ser mayor que 0', (value) => naturalNumber(value)),

	normed_capacity3: Yup.number()
		.required('La capacidad es requerida')

		.test('attendance', 'El número debe ser mayor que 0', (value) => naturalNumber(value)),
	normed_capacity4: Yup.number()
		.required('La capacidad es requerida')

		.test('attendance', 'El número debe ser mayor que 0', (value) => naturalNumber(value)),
	normed_capacity5: Yup.number()
		.required('La capacidad es requerida')

		.test('attendance', 'El número debe ser mayor que 0', (value) => naturalNumber(value)),
	normed_capacity6: Yup.number()
		.required('La capacidad es requerida')

		.test('attendance', 'El número debe ser mayor que 0', (value) => naturalNumber(value)),

	attendance2: Yup.number()
		.required('Se requiere el % de asistencia')
		.test('attendance', 'Escriba un valor entre 0 y 100', (value) => validateAttendance(value)),

	attendance3: Yup.number()
		.required('Se requiere el % de asistencia')
		.test('attendance', 'Escriba un valor entre 0 y 100', (value) => validateAttendance(value)),

	attendance4: Yup.number()
		.required('Se requiere el % de asistencia')
		.test('attendance', 'Escriba un valor entre 0 y 100', (value) => validateAttendance(value)),

	attendance5: Yup.number()
		.required('Se requiere el % de asistencia')
		.test('attendance', 'Escriba un valor entre 0 y 100', (value) => validateAttendance(value)),

	attendance6: Yup.number()
		.required('Se requiere el % de asistencia')
		.test('attendance', 'Escriba un valor entre 0 y 100', (value) => validateAttendance(value)),

	latlng: Yup.array().required('La ubicación es requerida'),
});
