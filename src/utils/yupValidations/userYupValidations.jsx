import * as Yup from 'yup';
import { validateStringMin2, validatePassword } from '../yupValidations/validateInputFunctions';

export const UserSchema = Yup.object().shape({
	nickname: Yup.string()
		.min(2, 'El usuario debe tener mas de 2 caracteres')
		.required('El usuario es requerido')
		.test('letras minimo 2', 'El usuario debe tener al menos 2 caracteres', (value) => validateStringMin2(value)),

	name: Yup.string()
		.required('El nombre es requerido')
		.test('letras minimmo 2', 'El Nombre debe tener al menos 2 caracteres', (value) => validateStringMin2(value)),

	lastname: Yup.string()
		.required('El apellido es requerido')
		.test('letras minimo 2', 'El apellido debe tener al menos 2 caracteres', (value) => validateStringMin2(value)),

	position: Yup.string()
		.required('El cargo es requerido')
		.test('letras minimo 2', 'El cargo debe tener al menos 2 caracteres', (value) => validateStringMin2(value)),

	role: Yup.string(),

	password: Yup.string().when('nickname', {
		is: (nickname) => nickname && nickname.trim() !== '',
		then: Yup.string().optional()
		.test(
			'formato password',
			'Debe contener al menos una letra minúscula, una letra mayúscula y un dígito',
			(value) => {
			if (value) {return validatePassword(value)}return true}),
		otherwise: Yup.string()
			.min(8, 'La contraseña debe contener al menos 8 caracteres')
			.required('La contraseña es requerida')
			.test(
				'formato password',
				'Debe contener al menos una letra minúscula, una letra mayúscula y un dígito',
				(value) => validatePassword(value)
			),
	}),
});
