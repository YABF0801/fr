import { baseAxios } from '../../../../api/baseAxios';

export const getCapacityAndMatricula = async () => {
  //  TOTALES GENERALES CAPACIDAD NORMADA Y MATRICULA
  const capacityMatricula = await baseAxios.get('/estadisticas/cap-mat');
  return capacityMatricula.data;
};