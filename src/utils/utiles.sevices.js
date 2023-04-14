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

   export const setContadorGp = async () => {
    try {
        await baseAxios.put('/propuestas/set-counter', );
    } catch (error) {
        throw new Error(`Error al setear el contador de generar propuestas: ${error.message}`);
 }
};

export const setContadorCc = async () => {
    try {
        await baseAxios.put('/propuestas/curso-counter', );
    } catch (error) {
        throw new Error(`Error al setear el contador de nuevo curso: ${error.message}`);
 }
};
   
export const resetToolsArrays = async () => {
    try {
        await baseAxios.put('/propuestas/reset-arrays', );
    } catch (error) {
        throw new Error(`Error al Resetear los arreglos en tools: ${error.message}`);
 }
};

export const getContadorGp = async () => {
	const tools = await baseAxios.get(`/submisions/get-tools`);
	return tools.data.contadorGp;
};

export const getContadorCc = async () => {
	const tools = await baseAxios.get(`/submisions/get-tools`);
	return tools.data.contadorCC;
};

   
export const resetContadorGp = async () => {
    try {
        await baseAxios.put('/propuestas/reset-counter', );
    } catch (error) {
        throw new Error(`Error al Resetear el contador de generar propuestas: ${error.message}`);
 }
};

export const ResetConsecutive = async () => {
    try {
        await baseAxios.put('/propuestas/reset-consecutive', );
    } catch (error) {
        throw new Error(`Error al Resetear el consecutivo: ${error.message}`);
 }
};

