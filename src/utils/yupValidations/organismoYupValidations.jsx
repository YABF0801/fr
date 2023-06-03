import * as Yup from "yup";
import {
  validateStringMin2,
  validateStringMin5,
} from "../yupValidations/validateInputFunctions";

export const OrganismoSchema = Yup.object().shape({

    name: Yup.string()
    .required('El nombre es requerido')
    .test('letras minimmo 2', "El Nombre debe tener mas de 2 caracteres", (value) =>
      validateStringMin2(value)
    ),

    description: Yup.string()
    .required('La descripción es requerida')
    .test('letras minimo 2', "La descripción debe tener mas de 5 caracteres", (value) =>
      validateStringMin5(value)
    ),

    priorizado: Yup.boolean(),

});




