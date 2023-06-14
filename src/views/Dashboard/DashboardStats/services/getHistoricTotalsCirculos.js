import { baseAxios } from '../../../../api/baseAxios';

export const getHistoricCirculos = async () => {
  //  TOTALES HISTORICOS GENERALES DE LOS CIRCULOS
  const historicTotals = await baseAxios.get('/estadisticas/historic-data');
  return historicTotals.data;
};
