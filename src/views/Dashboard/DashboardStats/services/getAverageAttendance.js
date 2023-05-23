import { baseAxios } from '../../../../api/baseAxios';

const getAverageAttendance = async () => {
	// porcientos de asistencia
	const result = await baseAxios.get('/estadisticas/asistencia');
	const attendanceData = result.data[0];
	const data = [
		attendanceData.totalAttendance2 || 50, // remove numbers
		attendanceData.totalAttendance3 || 25,
		attendanceData.totalAttendance4 || 80,
		attendanceData.totalAttendance5 || 10,
		attendanceData.totalAttendance6 || 100,
	];
	return data;
};


export default getAverageAttendance