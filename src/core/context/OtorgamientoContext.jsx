import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	FechaOmApiGet,
	saveFechaOm,
	resetFechaOm,
	getContadorGp,
	getContadorCc,
	resetContadores,
	resetToolsArrays,
	getContadorAcept,
} from '../../utils/utiles.sevices';
import { nuevoCursoApi } from '../../views/Dashboard/Circulos/service/circulo.services';
import { consecustiveApiReset } from '../../views/Dashboard/GeneralList/service/submision.services';


const OtorgamientoContext = createContext();

export const OtorgamientoProvider = ({ children }) => {

	const queryFechaOm = useQuery({ queryKey: ['fecha'], queryFn: FechaOmApiGet });

	const queryContadorCambioCurso = useQuery({ queryKey: ['contadorcc'], queryFn: getContadorCc });

	const queryContadorPropGeneradas = useQuery({ queryKey: ['contadorgp'], queryFn: getContadorGp });

	const queryContadorPropAceptadas = useQuery({ queryKey: ['contadorap'], queryFn: getContadorAcept });

	const queryClient = useQueryClient();

	const guardarFecha = useMutation({
		mutationFn: saveFechaOm,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fecha'] });
			queryClient.invalidateQueries({ queryKey: ['submisions'] });
		},
	});

	const resetearFecha = useMutation({
		mutationFn: resetFechaOm,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fecha'] });
		},
	});

	const resetAllContadores = useMutation({
		mutationFn: resetContadores,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['contadorgp'] });
			queryClient.invalidateQueries({ queryKey: ['submisions'] });
		},
	});

	const nuevoCurso = useMutation({
		mutationFn: nuevoCursoApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['curso'] });
			queryClient.invalidateQueries({ queryKey: ['propuestas'] });
			queryClient.invalidateQueries({ queryKey: ['submisions'] });
		},
	});

	const resetArrays = useMutation({
		mutationFn: resetToolsArrays,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['arrays'] });
		},
	});

	const resetearConsecutivo = useMutation({
		mutationFn: consecustiveApiReset,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fecha'] });
			queryClient.invalidateQueries({ queryKey: ['submisions'] });
		},
	});

	const value = useMemo(
		() => ({
			queryFechaOm,
			queryContadorCambioCurso,
			queryContadorPropGeneradas,
			queryContadorPropAceptadas,
			guardarFecha,
			resetearFecha,
			resetAllContadores,
			nuevoCurso,
			resetArrays,
			resetearConsecutivo
		}),
		[queryFechaOm, queryContadorCambioCurso, queryContadorPropGeneradas, queryContadorPropAceptadas]
	);

	return <OtorgamientoContext.Provider value={value}>{children}</OtorgamientoContext.Provider>;
};

OtorgamientoProvider.propTypes = {
	children: PropTypes.node,
};

export const useOtorgamientoContext = () => {
	return useContext(OtorgamientoContext);
};
