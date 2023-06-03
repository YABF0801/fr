import * as Yup from "yup";
import {
  validateStringMin2,
  validatePassword,
  validateRole,
} from "../yupValidations/validateInputFunctions";

export const UserSchema = Yup.object().shape({
    nickname: Yup.string()
    .min(2, 'El usuario debe tener mas de 2 caracteres')
    .required('El usuario es requerido')
    .test('letras minimo 2', "El usuario debe tener mas de 2 caracteres", (value) =>
      validateStringMin2(value)
    ),

    name: Yup.string()
    .required('El nombre es requerido')
    .test('letras minimmo 2', "El Nombre debe tener mas de 2 caracteres", (value) =>
      validateStringMin2(value)
    ),

    lastname: Yup.string()
    .required('El apellido es requerido')
    .test('letras minimo 2', "El apellido debe tener mas de 2 caracteres", (value) =>
      validateStringMin2(value)
    ),

    position: Yup.string()
    .required('El cargo es requerido')
    .test('letras minimo 2', 'El cargo debe tener mas de 2 caracteres', (value) =>
      validateStringMin2(value)
    ),

    role: Yup.string()
    .test('role tipo', "El tipo de role no es válido", (value) =>
      validateRole(value)
    ),
    
    password: Yup.string()
    .min(8, "La contraseña debe contener al menos 8 caracteres")
    .required("La contraseña es requerida")
    .test("formato password","Debe contener al menos una letra minúscula, una letra mayúscula y un dígito",
    (value) => validatePassword(value)
    ),
});




