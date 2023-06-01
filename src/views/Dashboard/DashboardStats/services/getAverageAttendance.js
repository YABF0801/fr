import { baseAxios } from '../../../../api/baseAxios';

const getAverageAttendance = async () => {
	// porcientos de asistencia
	const result = await baseAxios.get('/estadisticas/asistencia');
	const attendanceData = result.data[0];
	const data = [
		attendanceData.totalAttendance2,
		attendanceData.totalAttendance3,
		attendanceData.totalAttendance4,
		attendanceData.totalAttendance5,
		attendanceData.totalAttendance6,
	];
	return data;
};


export default getAverageAttendance