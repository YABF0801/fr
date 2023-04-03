import  {baseAxios}  from '../api/baseAxios';


export const FechaOmApiGet = async () => {
	const tools = await baseAxios.get(`/propuestas/get-tools`);
	return tools.data.omDate;
};

export const saveFechaOm = async (date) => {
    try {
        const newDate = await baseAxios.post('/propuestas/date', { date });
        return newDate;
    } catch (error) {
        throw new Error(`Error al actualizar la fecha : ${error.message}`);
    }
    };
	
 export const resetFechaOm = async () => {
        try {
            await baseAxios.put('/propuestas/date', );
        } catch (error) {
            throw new Error(`Error al resetear la fecha: ${error.message}`);
     }
   };

/* 

 ResetConsecutive 
 'el consecutivo ha sido reseteado correctamente.' 
 'Error al resetear el consecutivo.' 
 
 ResetContadorGP 
  'el contador de generacion de propuestas ha sido reseteado.' 
   'Error al resetear el contadorGP.' 
    */