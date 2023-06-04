import * as Yup from 'yup';
import {
    naturalNumber,
	validateCarnet,
	validateParentOcupation,
	validateParentType,
	validateStringMin2,
	validateStringMin5,
	validateSubmisionFinality,
	validateSubmisionStatus,
	validateSubmisionType,
	validateYearOfLife,
} from '../yupValidations/validateInputFunctions';

export const SubmisionSchema = Yup.object().shape({
	finality: Yup.string().test('submision finality', 'El tipo de finalidad no es válido', (value) =>
		validateSubmisionFinality(value)
	),

	submisiontype: Yup.string().test('submision tipo', 'El tipo de planilla no es válido', (value) =>
		validateSubmisionType(value)
	),

	socialCase: Yup.boolean(),

	entryNumber: Yup.number().required('El numero de entrada es requerido'),

	ciPedido: Yup.string().optional(),

	motive: Yup.string().optional(),

	status: Yup.string().test('valid-status', 'Estado de planilla no válido', validateSubmisionStatus),

	createdBy: Yup.string(),

	child: Yup.object().shape({
		childName: Yup.string()
			.required('El nombre es requerido')
			.test('letras minimmo 2', 'El nombre debe tener al menos 2 caracteres', (value) =>
				validateStringMin2(value)
			),

		childLastname: Yup.string()
			.required('Se requiere al menos un apellido')
			.test('letras minimmo 2', 'El apellido debe tener al menos 2 caracteres', (value) =>
				validateStringMin2(value)
			),

		carnet: Yup.number()
			.required('Se requiere un número de identificación')
			.test('valid carnet', 'El carnet no es valido', (value) => validateCarnet(value)),

		year_of_life: Yup.number()
			.required('Seleccione un año de vida')
			.test('valid year', 'Seleccione un año de vida', (value) => validateYearOfLife(value)),

		childAddress: Yup.string()
			.required('La dirección es requerida')
			.test('letras minimo 5', 'La dirección debe tener mas de 5 caracteres', (value) =>
				validateStringMin5(value)
			),

		neighborhood: Yup.string().optional(),

		cPopular: Yup.string()
			.required('Se requiere el Consejo Popular'),

		municipality: Yup.string()
			.required('Se requiere el municipio'),

		province: Yup.string(),

		circulo: Yup.object().optional().shape({
			_id: Yup.string(),
			name: Yup.string(),
		}),

		latlng: Yup.array().required('seleccione ubicacion en el mapa'),

		parents: Yup.array().of(
			Yup.object().shape({
				parentName: Yup.string()
					.required('El nombre es requerido')
					.test('letras minimmo 2', 'El nombre debe tener al menos 2 caracteres', (value) =>
						validateStringMin2(value)
					),

				parentLastname: Yup.string()
					.required('Se requiere al menos un apellido')
					.test('letras minimmo 2', 'El apellido debe tener al menos 2 caracteres', (value) =>
						validateStringMin2(value)
					),

				uniqueParent: Yup.boolean(),

				typeParent: Yup.string().test('parent tipo', 'El tipo no es válido', (value) =>
					validateParentType(value)
				),

				convivencia: Yup.boolean(),

				parentAddress: Yup.string().when('convivencia', {
					is: false,
					then: Yup.string()
						.required('La dirección es requerida')
						.test('letras minimo 5', 'La dirección debe tener mas de 5 caracteres', (value) =>
							validateStringMin5(value)
						),
				}),

				phoneNumber: Yup.string()
					.required('Se requiere el número de teléfono')
					.min(8, 'El número de teléfono debe tener al menos 8 caracteres')
					.max(15, 'El número de teléfono debe tener como máximo 15 caracteres'),

				occupation: Yup.string().test('occupation', 'El dato no es válido', (value) =>
					validateParentOcupation(value)
				),

				workName: Yup.string()
					.optional()
					.when('occupation', {
						is: (val) => val === 'trabajador' || val === 'estudiante',
						then: Yup.string()
							.min(2, 'Debe tener mínimo 2 caracteres')
							.required('Se requiere el nombre del centro'),
					}),

				workAddress: Yup.string()
					.optional()
					.when('occupation', {
						is: 'trabajador',
						then: Yup.string()
							.min(2, 'Debe tener mínimo 2 caracteres')
							.required('Se requiere la dirección del centro'),
					}),

				jobTitle: Yup.string()
					.optional()
					.when('occupation', {
						is: 'trabajador',
						then: Yup.string()
							.min(2, 'Debe tener mínimo 2 caracteres')
							.required('Se requiere el cargo que ocupa'),
					}),

				organismo: Yup.object()
					.optional()
					.when('occupation', {
						is: 'trabajador',
						then: Yup.object()
						.required('Se requiere un organismo')
						.shape({
							name: Yup.string(),
							weight: Yup.number()
						})
					}),

                salary: Yup.number()
                .test('salary', 'Escriba un número válido', (value) => naturalNumber(value)),

				otherChildrenInCi: Yup.boolean(),

				numberOfOtherChildrenInCi: Yup.number().optional()
                .when('otherChildrenInCi', {
                    is: true,
                    then: Yup.number()
                    .test('salary', 'Escriba un número válido', (value) => naturalNumber(value)),
                }),
               
				otherChildrenCenter: Yup.string().optional()
                .when('otherChildrenInCi', {
                    is: true,
                    then: Yup.string()
                    .required('Seleccione un circulo'),
                }),

				pregnant: Yup.boolean(),

				deaf: Yup.boolean(),
			})
		),
	}),
});
