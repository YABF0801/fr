import { baseAxios } from '../../api/baseAxios';
import ErrorMsg from '../../common/Toasts/ErrorMsg';
import SuccessMsg from '../../common/Toasts/SuccessMsg';
import ToastNotification from '../../common/Toasts/toasts';

export const propuestasApiGet = async () => {
	const allPropuestas = await baseAxios.get('/submisions');
	const propuestas = allPropuestas.data.filter((submision) => submision.status === 'propuesta');
	return propuestas;
};

export const propuestaApiGenerar = async () => {
	try {
		await baseAxios.post(`/propuestas/generar`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('custom', 'propuestas', 'generar')} : ${error.message}`);
	}
};

export const propuestaApiAceptar = async (submisions) => {
	// pasarle un arreglo
	try {
		const propuestas = await baseAxios.put(`/propuestas/aceptar`, submisions);
		ToastNotification('success', `${SuccessMsg('custom', `propuestas seleccionadas`, 'aceptadas')}`);
		return propuestas.data;
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('custom', 'propuestas', 'aceptar')} : ${error.message}`);
	}
};

export const propuestaApiRechazar = async (submisions) => {
	// pasarle un arreglo
	try {
		const propuestas = await baseAxios.put(`/propuestas/rechazar`, submisions);
		ToastNotification('info', 'Las propuestas no seleccionadas fueron rechazadas');
		return propuestas.data;
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('custom', 'propuestas', 'rechazar')} : ${error.message}`);
	}
};
