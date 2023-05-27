import  {baseAxios}  from '../../../../api/baseAxios';
import ToastNotification from '../../../../common/Toasts/toasts';

export const submisionsApiGet = async () => {
	const allSubmisions = await baseAxios.get('/submisions');
	const submisions = allSubmisions.data.filter(submision => submision.status !== 'propuesta')
	return submisions;
};

export const submisionsApiCreate = async (submision) => {
	try {
	const submisionCreated = await baseAxios.post('/submisions', submision);
	return submisionCreated.data;
} catch (error) {
	ToastNotification('error', `Error al crear la planilla: ${error.message}`);  
  }
};

export const submisionsApiUpdate = async (submision) => {
	try {
		await baseAxios.put(`/submisions/${submision.id}`, submision);
	} catch (error) {
		ToastNotification('error', `Error al actualizar la planilla: ${error.message}`);  
	}
};

export const submisionsApiDelete = async (id) => {
	try {
		await baseAxios.delete(`/submisions/${id}`);
	} catch (error) {
		ToastNotification('error', `Error al eliminar la planilla: ${error.message}`);  
	}
};

export const submisionsApiFindById = async (id) => {
	const submision = await baseAxios.get(`/submisions/${id}`);
	return submision.data;
};

export const consecustiveApiGet = async () => {
	const tools = await baseAxios.get(`/submisions/get-tools`);
	return tools.data.consecutive;
};

export const consecustiveApiReset= async () => {
	try {
		await baseAxios.put(`/submisions/reset-consecutive`);
	} catch (error) {
		ToastNotification('error', `Error al resetear consecutivo: ${error.message}`);  
	}
};

export const submisionsApiBaja = async (id) => {
	try {
		await baseAxios.put(`/submisions/baja/${id}`);
	} catch (error) {
		ToastNotification('error', `Error al dar baja de la matrícula: ${error.message}`);  
	}
  };
  

