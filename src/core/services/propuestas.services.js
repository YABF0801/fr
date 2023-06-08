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
	} catch (error) {
		handleToastyError(error)
	}
};

export const propuestaApiAceptar = async (submisions) => {
	// pasarle un arreglo
	try {
		const propuestas = await baseAxios.put(`/propuestas/aceptar`, submisions);
		ToastNotification('success', `${SuccessMsg('custom', `propuestas seleccionadas`, 'aceptadas')}`);
		return propuestas.data;
	} catch (error) {
		handleToastyError(error)
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
