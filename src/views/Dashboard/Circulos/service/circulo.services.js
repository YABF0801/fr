import { baseAxios } from '../../../../api/baseAxios';
import ErrorMsg from '../../../../common/Toasts/ErrorMsg';
import SuccessMsg from '../../../../common/Toasts/SuccessMsg';
import ToastNotification from '../../../../common/Toasts/toasts';

export const circulosApiGet = async () => {
	const circulos = await baseAxios.get('/circulos/');
	return circulos.data;
};

export const circulosApiCreate = async (circulo) => {
	try {
		const circuloCreated = await baseAxios.post('/circulos', circulo);
		ToastNotification('success', `${SuccessMsg('create', `circulo ${circulo.name}`)}`);
		return circuloCreated.data;
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('create', 'circulo')} : ${error.message}`);
	}
};


export const circulosApiUpdate = async (circulo) => {
	try {
		await baseAxios.put(`/circulos/${circulo._id}`, circulo);
		ToastNotification('success', `${SuccessMsg('update', `circulo ${circulo.name}`)}`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('update', 'circulo')} : ${error.message}`);
	}
};

export const circulosApiFindById = async (id) => {
	const circuloFind = await baseAxios.get(`/circulos/${id}`);
	return circuloFind.data;
};

export const circulosApiDelete = async (id) => {
	try {
		await baseAxios.delete(`/circulos/${id}`);
		ToastNotification('success', `${SuccessMsg('delete', `circulo`)}`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('delete', 'circulo')} : ${error.message}`);
	}
};

export const circulosApiStatus = async (id) => {
	try {
		await baseAxios.put(`/circulos/status/${id}`);
		ToastNotification('success', `${SuccessMsg('custom', `estado`, 'actualizado')}`);
	} catch (error) {
		ToastNotification('error',  `${ErrorMsg("custom", "circulo", 'cambiar estado del')} : ${error.message}`);
	}
};

export const proyeccionApiGet = async () => {
	try {
		await baseAxios.get('/circulos/proyectar');
		const tools = await baseAxios.get('/submisions/get-tools');
		return tools.data.proyeccionParaGP;
	} catch (error) {
		ToastNotification('error',  `${ErrorMsg("custom", "proyección", 'ejecutar')} : ${error.message}`);
	}
};

export const cursoApiGet = async () => {
	const tools = await baseAxios.get(`/submisions/get-tools`);
	return tools.data.curso;
};

export const nuevoCursoApiGet = async () => {
	try {
		await baseAxios.post('/circulos/nuevo-curso');
		ToastNotification('success', `${SuccessMsg('custom', `nuevo curso`, 'establecido')}`);
	} catch (error) {
		ToastNotification('error',  `${ErrorMsg("custom", "cambio de curso", 'ejecutar')} : ${error.message}`);
	}
};
