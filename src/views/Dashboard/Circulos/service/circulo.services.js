import { baseAxios } from '../../../../api/baseAxios';
import SuccessMsg from '../../../../common/Toasts/SuccessMsg';
import ToastNotification from '../../../../common/Toasts/toasts';
import { handleToastyError } from '../../../../utils/handleError';

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
		handleToastyError(error)
	}
};

export const circulosApiUpdate = async (circulo) => {
	try {
		await baseAxios.put(`/circulos/${circulo._id}`, circulo);
		ToastNotification('success', `${SuccessMsg('update', `circulo ${circulo.name}`)}`);
	} catch (error) {
		handleToastyError(error)
	}
};

export const circulosApiFindById = async (id) => {
	try {
		const circuloFind = await baseAxios.get(`/circulos/${id}`);
		return circuloFind.data;
	} catch (error) {
		handleToastyError(error)
	}
};

export const circulosApiDelete = async (id) => {
	try {
		await baseAxios.delete(`/circulos/${id}`);
		ToastNotification('success', `${SuccessMsg('delete', `circulo`)}`);
	} catch (error) {
		handleToastyError(error)
	}
};

export const circulosApiStatus = async (id) => {
	try {
		await baseAxios.put(`/circulos/status/${id}`);
		ToastNotification('success', `${SuccessMsg('custom', `estado`, 'actualizado')}`);
	} catch (error) {
		handleToastyError(error)
	}
};

export const pastCirculosApiGet = async () => {
	const pastCirculos = await baseAxios.get('/circulos/historic');
	console.log('orig',pastCirculos)
	return pastCirculos.data;
}; 

export const pastCirculosSetArray = async (year) => {
	if (!year) {
	  return []; 
	}
  	const pastCirculos = await baseAxios.get('/circulos/historic');
	const selectedCourse = pastCirculos.data.filter((pastCirculo) => pastCirculo.year === year);
	const circulos = selectedCourse[0].circulos;
	return circulos;
  };

export const proyeccionApiGet = async () => {
	try {
		await baseAxios.get('/circulos/proyectar');
		const tools = await baseAxios.get('/submisions/get-tools');
		return tools.data.proyeccionParaGP;
	} catch (error) {
		handleToastyError(error)
	}
};

export const cursoApiGet = async () => {
	const tools = await baseAxios.get(`/submisions/get-tools`);
	return tools.data.curso;
};

export const nuevoCursoApi = async () => {
	try {
		await baseAxios.post('/circulos/nuevo-curso');
		ToastNotification('success', `${SuccessMsg('custom', `nuevo curso`, 'establecido')}`);
	} catch (error) {
		handleToastyError(error)
	}
};
