import { baseAxios } from '../../api/baseAxios';
import SuccessMsg from '../../common/Toasts/SuccessMsg';
import ToastNotification from '../../common/Toasts/toasts';
import { handleToastyError } from '../../utils/handleError';

export const propuestasApiGet = async () => {
	const allPropuestas = await baseAxios.get('/submisions');
	const propuestas = allPropuestas.data.filter((submision) => submision.status === 'propuesta');
	return propuestas;
};

export const propuestaApiGenerar = async () => {
	try {
		await baseAxios.post(`/propuestas/generar`);
		await setContadorGp();
	} catch (error) {
		handleToastyError(error)
	}
};

export const setContadorGp = async () => {
    try {
        await baseAxios.put('/propuestas/set-counter', );
    } catch (error) {
        throw new Error(`Error al setear el contador de generar propuestas: ${error.message}`);
 }
};

export const propuestaApiAceptar = async (submisions) => {
	// pasarle un arreglo
	try {
		const propuestas = await baseAxios.put(`/propuestas/aceptar`, submisions);
		setContadorAcept();
		ToastNotification('success', `${SuccessMsg('custom', `propuestas seleccionadas`, 'aceptadas')}`);
		return propuestas.data;
	} catch (error) {
		handleToastyError(error)
	}
};

export const setContadorAcept = async () => {
    try {
        await baseAxios.put('/propuestas/acept-counter', );
    } catch (error) {
        throw new Error(`Error al setear el contador de aceptadas: ${error.message}`);
 }
};

export const propuestaApiRechazar = async (submisions) => {
	// pasarle un arreglo
	try {
		const propuestas = await baseAxios.put(`/propuestas/rechazar`, submisions);
		ToastNotification('info', 'Las propuestas no seleccionadas fueron rechazadas');
		return propuestas.data;
	} catch (error) {
		handleToastyError(error)
	}
};
